package com.rental.rental.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rental.rental.dao.IBranchDao;
import com.rental.rental.dao.IBookingManagmentDao;
import com.rental.rental.dao.IVehicleDao;
import com.rental.rental.dto.DashboardStats;
import com.rental.rental.entity.*;
import com.rental.rental.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;

@Service
public class BookingManagmentService implements IBookingManagmentService {

    @Autowired
    IVehicleService vehicleService;

    @Autowired
    IBookingManagmentDao bookingManagmentDao;

    @Autowired
    IBranchService branchService;

    @Autowired
    IBranchDao branchDao;

    @Autowired
    IVehicleDao vehicleDao;

    @Override
    @Transactional
    public BookedVehicleDetailsResponse bookVehicle(BookVehicleRequest request) {
        if (request.getStartTime() >= request.getEndTime())
            throw new IllegalArgumentException("Start time must be before end time");

        List<Vehicle> vehicleList = vehicleService.getVehicleByNameAndType(request.getVehicleName(), request.getVehicleType());
        if (vehicleList.isEmpty())
            throw new ResourceNotFoundException("No vehicle of type '" + request.getVehicleType() + "' with name '" + request.getVehicleName() + "' found");

        for (Vehicle entity : vehicleList) {
            BookedVehicleEntity existing = bookingManagmentDao.getBookedVehicleEntityByVehicleIdByStartTimeByEndTime(
                    entity.getVehicleId(), request.getStartTime(), request.getEndTime(), "ACTIVE");
            if (existing == null) {
                int hours = request.getEndTime() - request.getStartTime();
                double totalPrice = hours * entity.getPricePerHour();

                BookedVehicleEntity booking = new BookedVehicleEntity();
                booking.setStartTime(request.getStartTime());
                booking.setEndTime(request.getEndTime());
                booking.setVehicleId(entity.getVehicleId());
                booking.setStatus("ACTIVE");
                booking.setCustomerName(request.getCustomerName());
                booking.setCustomerEmail(request.getCustomerEmail());
                booking.setCustomerPhone(request.getCustomerPhone());
                booking.setTotalPrice(totalPrice);
                bookingManagmentDao.save(booking);

                return buildResponse(booking, entity);
            }
        }
        throw new IllegalArgumentException("No vehicles available for the requested time slot. Please try different hours.");
    }

    @Override
    public List<BookedVehicleDetailsResponse> showDetails() {
        List<BookedVehicleDetailsResponse> response = new ArrayList<>();
        List<BookedVehicleEntity> list = bookingManagmentDao.findRecentBookings();

        for (BookedVehicleEntity entity : list) {
            try {
                Vehicle vehicle = vehicleService.getById(entity.getVehicleId());
                response.add(buildResponse(entity, vehicle));
            } catch (Exception e) {
                response.add(buildResponseWithoutVehicle(entity));
            }
        }
        return response;
    }

    @Override
    @Transactional
    public BookedVehicleDetailsResponse cancelBooking(Long bookingId) {
        BookedVehicleEntity booking = bookingManagmentDao.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        if ("CANCELLED".equals(booking.getStatus()))
            throw new IllegalArgumentException("Booking is already cancelled");

        booking.setStatus("CANCELLED");
        bookingManagmentDao.save(booking);

        try {
            Vehicle vehicle = vehicleService.getById(booking.getVehicleId());
            return buildResponse(booking, vehicle);
        } catch (Exception e) {
            return buildResponseWithoutVehicle(booking);
        }
    }

    @Override
    @Transactional
    public BookedVehicleDetailsResponse completeBooking(Long bookingId) {
        BookedVehicleEntity booking = bookingManagmentDao.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        if (!"ACTIVE".equals(booking.getStatus()))
            throw new IllegalArgumentException("Only active bookings can be completed");

        booking.setStatus("COMPLETED");
        bookingManagmentDao.save(booking);

        try {
            Vehicle vehicle = vehicleService.getById(booking.getVehicleId());
            return buildResponse(booking, vehicle);
        } catch (Exception e) {
            return buildResponseWithoutVehicle(booking);
        }
    }

    @Override
    public BookedVehicleDetailsResponse getBookingById(Long bookingId) {
        BookedVehicleEntity booking = bookingManagmentDao.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));
        Vehicle vehicle = vehicleService.getById(booking.getVehicleId());
        return buildResponse(booking, vehicle);
    }

    @Override
    public DashboardStats getDashboardStats() {
        DashboardStats stats = new DashboardStats();
        stats.setTotalBranches(branchDao.count());
        stats.setTotalVehicles(vehicleDao.count());
        stats.setTotalBookings(bookingManagmentDao.count());
        stats.setActiveBookings(bookingManagmentDao.countByStatus("ACTIVE"));
        stats.setCancelledBookings(bookingManagmentDao.countByStatus("CANCELLED"));
        stats.setCompletedBookings(bookingManagmentDao.countByStatus("COMPLETED"));
        stats.setTotalRevenue(bookingManagmentDao.getTotalRevenue());

        // Bookings by vehicle type
        List<BookedVehicleEntity> allBookings = bookingManagmentDao.findAll();
        Map<String, Long> typeCount = new HashMap<>();
        for (BookedVehicleEntity b : allBookings) {
            try {
                Vehicle v = vehicleService.getById(b.getVehicleId());
                typeCount.merge(v.getVehicleType(), 1L, Long::sum);
            } catch (Exception ignored) {}
        }
        List<Map<String, Object>> byType = typeCount.entrySet().stream()
                .map(e -> { Map<String, Object> m = new HashMap<>(); m.put("type", e.getKey()); m.put("count", e.getValue()); return m; })
                .collect(Collectors.toList());
        stats.setBookingsByVehicleType(byType);

        // Revenue by branch
        Map<String, Double> branchRevenue = new HashMap<>();
        for (BookedVehicleEntity b : allBookings) {
            if (!"ACTIVE".equals(b.getStatus())) continue;
            try {
                Vehicle v = vehicleService.getById(b.getVehicleId());
                Branch branch = branchService.getById(v.getBranchId());
                branchRevenue.merge(branch.getBranchName(), b.getTotalPrice() != null ? b.getTotalPrice() : 0.0, Double::sum);
            } catch (Exception ignored) {}
        }
        List<Map<String, Object>> byBranch = branchRevenue.entrySet().stream()
                .map(e -> { Map<String, Object> m = new HashMap<>(); m.put("branch", e.getKey()); m.put("revenue", e.getValue()); return m; })
                .collect(Collectors.toList());
        stats.setRevenueByBranch(byBranch);

        // Recent bookings (last 10)
        List<BookedVehicleEntity> recent = bookingManagmentDao.findRecentBookings();
        List<Map<String, Object>> recentList = new ArrayList<>();
        int limit = Math.min(recent.size(), 10);
        for (int i = 0; i < limit; i++) {
            BookedVehicleEntity b = recent.get(i);
            Map<String, Object> m = new HashMap<>();
            m.put("bookingId", b.getBookedVehicleId());
            m.put("customerName", b.getCustomerName());
            m.put("status", b.getStatus());
            m.put("totalPrice", b.getTotalPrice());
            m.put("bookingDate", b.getBookingDate());
            try {
                Vehicle v = vehicleService.getById(b.getVehicleId());
                m.put("vehicleName", v.getVehicleName());
                m.put("vehicleType", v.getVehicleType());
            } catch (Exception ignored) {}
            recentList.add(m);
        }
        stats.setRecentBookings(recentList);

        return stats;
    }

    private BookedVehicleDetailsResponse buildResponse(BookedVehicleEntity booking, Vehicle vehicle) {
        BookedVehicleDetailsResponse resp = new BookedVehicleDetailsResponse();
        resp.setBookingId(booking.getBookedVehicleId());
        resp.setVehicleName(vehicle.getVehicleName());
        resp.setVehicleType(vehicle.getVehicleType());
        resp.setStartTime(booking.getStartTime());
        resp.setEndTime(booking.getEndTime());
        resp.setPricePerHour(vehicle.getPricePerHour());
        resp.setTotalPrice(booking.getTotalPrice());
        resp.setStatus(booking.getStatus());
        resp.setCustomerName(booking.getCustomerName());
        resp.setCustomerEmail(booking.getCustomerEmail());
        resp.setBookingDate(booking.getBookingDate());
        try {
            Branch branch = branchService.getById(vehicle.getBranchId());
            resp.setBranchName(branch.getBranchName());
        } catch (Exception ignored) {}
        return resp;
    }

    private BookedVehicleDetailsResponse buildResponseWithoutVehicle(BookedVehicleEntity booking) {
        BookedVehicleDetailsResponse resp = new BookedVehicleDetailsResponse();
        resp.setBookingId(booking.getBookedVehicleId());
        resp.setVehicleName("Deleted Vehicle");
        resp.setVehicleType("N/A");
        resp.setStartTime(booking.getStartTime());
        resp.setEndTime(booking.getEndTime());
        resp.setTotalPrice(booking.getTotalPrice());
        resp.setStatus(booking.getStatus());
        resp.setCustomerName(booking.getCustomerName());
        resp.setCustomerEmail(booking.getCustomerEmail());
        resp.setBookingDate(booking.getBookingDate());
        return resp;
    }
}

package com.rental.rental.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rental.rental.dao.IVehicleDao;
import com.rental.rental.dao.IBookingManagmentDao;
import com.rental.rental.entity.AddVehicleRequest;
import com.rental.rental.entity.BookedVehicleEntity;
import com.rental.rental.entity.Vehicle;
import com.rental.rental.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;

@Service
public class VehicleService implements IVehicleService {

    @Autowired
    IVehicleDao vehicleDao;

    @Autowired
    IBranchService branchService;

    @Autowired
    IBookingManagmentDao bookingDao;

    @Override
    @Transactional
    public Vehicle addVehicle(AddVehicleRequest request) {
        Optional<Long> branchId = branchService.getBranchId(request.getBranchName());
        Long id = branchId.orElseThrow(() -> new ResourceNotFoundException("Branch '" + request.getBranchName() + "' does not exist"));

        int count = (int) (request.getCount() == null ? 1 : request.getCount());
        Vehicle lastSaved = null;
        for (int i = 0; i < count; i++) {
            Vehicle vehicle = new Vehicle(request.getVehicleType(), request.getVehicleName(), id, request.getPricePerHour());
            vehicle.setDescription(request.getDescription());
            vehicle.setImageUrl(request.getImageUrl());
            lastSaved = vehicleDao.save(vehicle);
        }
        return lastSaved;
    }

    @Override
    public List<Vehicle> getVehicleByNameAndType(String vehicleName, String vehicleType) {
        return vehicleDao.getVehicleByNameAndType(vehicleName, vehicleType);
    }

    @Override
    public Vehicle getById(Long vehicleId) {
        return vehicleDao.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with id: " + vehicleId));
    }

    @Override
    public List<Vehicle> getAllVehicles() {
        List<Vehicle> vehicles = vehicleDao.findAll();
        vehicles.forEach(this::enrichWithBookingStatus);
        return vehicles;
    }

    @Override
    public List<Vehicle> searchVehicles(String vehicleType, Long branchId, Double minPrice, Double maxPrice) {
        List<Vehicle> vehicles = vehicleDao.searchVehicles(vehicleType, branchId, minPrice, maxPrice);
        vehicles.forEach(this::enrichWithBookingStatus);
        return vehicles;
    }

    private void enrichWithBookingStatus(Vehicle v) {
        long count = bookingDao.countActiveByVehicleId(v.getVehicleId());
        v.setActiveBookings(count);
        v.setAvailable(count == 0);
    }

    @Override
    public List<String> getAllVehicleTypes() {
        return vehicleDao.findAllVehicleTypes();
    }

    @Override
    @Transactional
    public Vehicle updateVehicle(Long id, AddVehicleRequest request) {
        Vehicle vehicle = getById(id);
        if (request.getVehicleName() != null) vehicle.setVehicleName(request.getVehicleName());
        if (request.getVehicleType() != null) vehicle.setVehicleType(request.getVehicleType());
        if (request.getPricePerHour() != null) vehicle.setPricePerHour(request.getPricePerHour());
        if (request.getDescription() != null) vehicle.setDescription(request.getDescription());
        if (request.getImageUrl() != null) vehicle.setImageUrl(request.getImageUrl());
        return vehicleDao.save(vehicle);
    }

    @Override
    @Transactional
    public void deleteVehicle(Long id) {
        if (!vehicleDao.existsById(id))
            throw new ResourceNotFoundException("Vehicle not found with id: " + id);

        // Delete all bookings for this vehicle
        List<BookedVehicleEntity> allBookings = bookingDao.findByVehicleId(id);
        bookingDao.deleteAll(allBookings);

        vehicleDao.deleteById(id);
    }
}

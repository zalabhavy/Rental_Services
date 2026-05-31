package com.rental.rental.service;

import java.util.List;

import com.rental.rental.dto.DashboardStats;
import com.rental.rental.entity.BookVehicleRequest;
import com.rental.rental.entity.BookedVehicleDetailsResponse;

public interface IBookingManagmentService {
    BookedVehicleDetailsResponse bookVehicle(BookVehicleRequest bookVehicleRequest);
    List<BookedVehicleDetailsResponse> showDetails();
    BookedVehicleDetailsResponse cancelBooking(Long bookingId);
    BookedVehicleDetailsResponse completeBooking(Long bookingId);
    BookedVehicleDetailsResponse getBookingById(Long bookingId);
    DashboardStats getDashboardStats();
}

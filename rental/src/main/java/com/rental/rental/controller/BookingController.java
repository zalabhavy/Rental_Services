package com.rental.rental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rental.rental.dto.ApiResponse;
import com.rental.rental.entity.BookVehicleRequest;
import com.rental.rental.entity.BookedVehicleDetailsResponse;
import com.rental.rental.service.IBookingManagmentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/bookings")
@Tag(name = "Booking Management", description = "APIs for booking and managing vehicle rentals")
public class BookingController {

    @Autowired
    IBookingManagmentService bookingService;

    @GetMapping
    @Operation(summary = "Get all bookings", description = "Retrieve all booking details with vehicle and branch info")
    public ResponseEntity<ApiResponse<List<BookedVehicleDetailsResponse>>> getAllBookings() {
        List<BookedVehicleDetailsResponse> bookings = bookingService.showDetails();
        return ResponseEntity.ok(ApiResponse.success("Bookings retrieved successfully", bookings));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get booking by ID")
    public ResponseEntity<ApiResponse<BookedVehicleDetailsResponse>> getBookingById(@PathVariable Long id) {
        BookedVehicleDetailsResponse booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(ApiResponse.success("Booking retrieved successfully", booking));
    }

    @PostMapping
    @Operation(summary = "Book a vehicle", description = "Create a new booking for the cheapest available vehicle matching criteria")
    public ResponseEntity<ApiResponse<BookedVehicleDetailsResponse>> bookVehicle(@Valid @RequestBody BookVehicleRequest request) {
        BookedVehicleDetailsResponse booking = bookingService.bookVehicle(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Vehicle booked successfully!", booking));
    }

    @PutMapping("/{id}/cancel")
    @Operation(summary = "Cancel a booking")
    public ResponseEntity<ApiResponse<BookedVehicleDetailsResponse>> cancelBooking(@PathVariable Long id) {
        BookedVehicleDetailsResponse booking = bookingService.cancelBooking(id);
        return ResponseEntity.ok(ApiResponse.success("Booking cancelled successfully", booking));
    }

    @PutMapping("/{id}/complete")
    @Operation(summary = "Complete a booking", description = "Mark a booking as completed to release the vehicle")
    public ResponseEntity<ApiResponse<BookedVehicleDetailsResponse>> completeBooking(@PathVariable Long id) {
        BookedVehicleDetailsResponse booking = bookingService.completeBooking(id);
        return ResponseEntity.ok(ApiResponse.success("Booking completed successfully", booking));
    }
}

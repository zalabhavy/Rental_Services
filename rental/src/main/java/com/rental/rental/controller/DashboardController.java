package com.rental.rental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rental.rental.dto.ApiResponse;
import com.rental.rental.dto.DashboardStats;
import com.rental.rental.service.IBookingManagmentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/dashboard")
@Tag(name = "Dashboard", description = "Admin dashboard analytics APIs")
public class DashboardController {

    @Autowired
    IBookingManagmentService bookingService;

    @GetMapping("/stats")
    @Operation(summary = "Get dashboard statistics", description = "Get total branches, vehicles, bookings, revenue, and charts data")
    public ResponseEntity<ApiResponse<DashboardStats>> getDashboardStats() {
        DashboardStats stats = bookingService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.success("Dashboard stats retrieved", stats));
    }
}

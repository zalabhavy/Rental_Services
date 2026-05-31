package com.rental.rental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rental.rental.dto.ApiResponse;
import com.rental.rental.entity.AddVehicleRequest;
import com.rental.rental.entity.Vehicle;
import com.rental.rental.service.IVehicleService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/vehicles")
@Tag(name = "Vehicle Management", description = "APIs for managing rental vehicles")
public class VehicleController {

    @Autowired
    IVehicleService vehicleService;

    @GetMapping
    @Operation(summary = "Get all vehicles", description = "Retrieve all vehicles with optional filters")
    public ResponseEntity<ApiResponse<List<Vehicle>>> getAllVehicles(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Long branchId,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {

        List<Vehicle> vehicles;
        if (type != null || branchId != null || minPrice != null || maxPrice != null) {
            vehicles = vehicleService.searchVehicles(type, branchId, minPrice, maxPrice);
        } else {
            vehicles = vehicleService.getAllVehicles();
        }
        return ResponseEntity.ok(ApiResponse.success("Vehicles retrieved successfully", vehicles));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get vehicle by ID")
    public ResponseEntity<ApiResponse<Vehicle>> getVehicleById(@PathVariable Long id) {
        Vehicle vehicle = vehicleService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Vehicle retrieved successfully", vehicle));
    }

    @GetMapping("/types")
    @Operation(summary = "Get all vehicle types", description = "Get distinct list of all vehicle types")
    public ResponseEntity<ApiResponse<List<String>>> getVehicleTypes() {
        List<String> types = vehicleService.getAllVehicleTypes();
        return ResponseEntity.ok(ApiResponse.success("Vehicle types retrieved", types));
    }

    @PostMapping
    @Operation(summary = "Add a new vehicle")
    public ResponseEntity<ApiResponse<Vehicle>> addVehicle(@Valid @RequestBody AddVehicleRequest request) {
        Vehicle vehicle = vehicleService.addVehicle(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Vehicle added successfully", vehicle));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a vehicle")
    public ResponseEntity<ApiResponse<Vehicle>> updateVehicle(@PathVariable Long id, @RequestBody AddVehicleRequest request) {
        Vehicle vehicle = vehicleService.updateVehicle(id, request);
        return ResponseEntity.ok(ApiResponse.success("Vehicle updated successfully", vehicle));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a vehicle")
    public ResponseEntity<ApiResponse<Void>> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.ok(ApiResponse.success("Vehicle deleted successfully"));
    }
}

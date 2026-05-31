package com.rental.rental.service;

import java.util.List;

import com.rental.rental.entity.AddVehicleRequest;
import com.rental.rental.entity.Vehicle;

public interface IVehicleService {
    Vehicle addVehicle(AddVehicleRequest addVehicleRequest);
    List<Vehicle> getVehicleByNameAndType(String vehicleName, String vehicleType);
    Vehicle getById(Long vehicleId);
    List<Vehicle> getAllVehicles();
    List<Vehicle> searchVehicles(String vehicleType, Long branchId, Double minPrice, Double maxPrice);
    List<String> getAllVehicleTypes();
    Vehicle updateVehicle(Long id, AddVehicleRequest request);
    void deleteVehicle(Long id);
}

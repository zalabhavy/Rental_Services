package com.rental.rental.service;

import java.util.List;

import com.rental.rental.entity.AddVehicleRequest;
import com.rental.rental.entity.Vehicle;

public interface IVehicleService {

	String addVehicle(AddVehicleRequest addVehicleRequest);

	List<Vehicle> getVehicleByNameAndType(String vehicleName, String vehicleType);

	Vehicle getById(Long vehicleId);

}

package com.rental.rental.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rental.rental.dao.IVehicleDao;
import com.rental.rental.entity.AddVehicleRequest;
import com.rental.rental.entity.Vehicle;

@Service
public class VehicleService implements IVehicleService {
	
	@Autowired
	IVehicleDao vehicleDao;
	
	@Autowired
	IBranchService branchService;

	@Override
	public String addVehicle(AddVehicleRequest addVehicleRequest) {
		
		Optional<Long> branchId=branchService.getBranchId(addVehicleRequest.getBranchName());
		Long id=branchId.orElse((long) 0);
		if(id==null||id==0) return "Branch Doesn't Exist!!";
		
		int count=(int) (addVehicleRequest.getCount()==null?1:addVehicleRequest.getCount());
		for(int i=0;i<count;i++) {
			Vehicle vehicle=new Vehicle(addVehicleRequest.getVehicleType(), addVehicleRequest.getVehicleName(),id,addVehicleRequest.getPricePerHour());
			vehicleDao.save(vehicle);
		}
		return "Vehicles added Successfully!!";
	}

	@Override
	public List<Vehicle> getVehicleByNameAndType(String vehicleName, String vehicleType) {
		return vehicleDao.getVehicleByNameAndType(vehicleName,vehicleType);
	}

	@Override
	public Vehicle getById(Long vehicleId) {
		return vehicleDao.getReferenceById(vehicleId);
	}
	
	
	

}

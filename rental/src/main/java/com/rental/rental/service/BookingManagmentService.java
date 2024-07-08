package com.rental.rental.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rental.rental.dao.IBookingManagmentDao;
import com.rental.rental.entity.BookVehicleRequest;
import com.rental.rental.entity.BookedVehicleDetailsResponse;
import com.rental.rental.entity.BookedVehicleEntity;
import com.rental.rental.entity.Branch;
import com.rental.rental.entity.Vehicle;

import jakarta.transaction.Transactional;

@Service
public class BookingManagmentService implements IBookingManagmentService {

	@Autowired
	IVehicleService vehicleService;
	
	@Autowired
	IBookingManagmentDao bookingManagmentDao;
	
	@Autowired
	IBranchService branchService;
	
	@Override
	@Transactional
	public String bookVehicle(BookVehicleRequest bookVehicleRequest) {
  
		List<Vehicle> vehicleList=vehicleService.getVehicleByNameAndType(bookVehicleRequest.getVehicleName(),bookVehicleRequest.getVehicleType());
		if(vehicleList.isEmpty())
			return "No vehicle of such Type or Name is Available Right Now!!";
		
		for(Vehicle entity:vehicleList) {
			BookedVehicleEntity bookedVehicleEntity=bookingManagmentDao.getBookedVehicleEntityByVehicleIdByStartTimeByEndTime(entity.getVehicleId(),bookVehicleRequest.getStartTime(),bookVehicleRequest.getEndTime(),"ACTIVE");
			if(bookedVehicleEntity==null) {
				bookedVehicleEntity=new BookedVehicleEntity();
				bookedVehicleEntity.setStartTime(bookVehicleRequest.getStartTime());
				bookedVehicleEntity.setEndTime(bookVehicleRequest.getEndTime());
				bookedVehicleEntity.setVehicleId(entity.getVehicleId());
				bookedVehicleEntity.setStatus("ACTIVE");
				bookingManagmentDao.save(bookedVehicleEntity);
				return "This vehicle is booked sucessfullly!!!!";
			}
		}
		return "This vehicle is not availabe for the booking right now check after some time!!";
	
	}

	@Override
	public List<BookedVehicleDetailsResponse> showDetails() {
		
		List<BookedVehicleDetailsResponse> response=new ArrayList<BookedVehicleDetailsResponse>();
		List<BookedVehicleEntity> list=bookingManagmentDao.findAll();
		if(list.isEmpty())
			return response;
		
		for(BookedVehicleEntity entity:list) {
			Vehicle vehicle=vehicleService.getById(entity.getVehicleId());
			if(vehicle!=null) {
				Branch branch=branchService.getById(vehicle.getBranchId());
				BookedVehicleDetailsResponse bookedVehicleDetailsResponse=new BookedVehicleDetailsResponse();
				if(branch!=null)
				bookedVehicleDetailsResponse.setBranchName(branch.getBranchName());
				bookedVehicleDetailsResponse.setStartTime(entity.getStartTime());
				bookedVehicleDetailsResponse.setEndTime(entity.getEndTime());
				bookedVehicleDetailsResponse.setPricePerHour(vehicle.getPricePerHour());
				bookedVehicleDetailsResponse.setVehicleType(vehicle.getVehicleType());
				response.add(bookedVehicleDetailsResponse);
			}
			
		}
		return response;
	}

}

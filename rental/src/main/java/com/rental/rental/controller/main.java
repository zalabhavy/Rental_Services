package com.rental.rental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.rental.rental.entity.AddVehicleRequest;
import com.rental.rental.entity.BookVehicleRequest;
import com.rental.rental.entity.BookedVehicleDetailsResponse;
import com.rental.rental.entity.CreateBranchRequest;
import com.rental.rental.service.IBookingManagmentService;
import com.rental.rental.service.IBranchService;
import com.rental.rental.service.IVehicleService;

@RestController
public class main {
	
	@Autowired
	IBranchService branchService;
	
	@Autowired
	IVehicleService vehicleService;
	
	@Autowired
	IBookingManagmentService bookingManagmentService;
	
	@PostMapping("/create/branch")
	String createBranch(@RequestBody CreateBranchRequest createBranchRequest) {
		return this.branchService.createBranch(createBranchRequest);	
	}
	
	@PostMapping("/add/vehicle")
	String addVehicle(@RequestBody AddVehicleRequest addVehicleRequest) {
		return this.vehicleService.addVehicle(addVehicleRequest);	
	}
	
	@PostMapping("/book/vehicle")
	String bookVehicle(@RequestBody BookVehicleRequest bookVehicleRequest) {
		return this.bookingManagmentService.bookVehicle(bookVehicleRequest);
	}
	
	@PostMapping("/details/show")
	List<BookedVehicleDetailsResponse> showDetails() {
		return this.bookingManagmentService.showDetails();
	}
	
	

}

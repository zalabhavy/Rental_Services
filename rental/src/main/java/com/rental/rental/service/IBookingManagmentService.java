package com.rental.rental.service;

import java.util.List;

import com.rental.rental.entity.BookVehicleRequest;
import com.rental.rental.entity.BookedVehicleDetailsResponse;

public interface IBookingManagmentService {

	String bookVehicle(BookVehicleRequest bookVehicleRequest);

	List<BookedVehicleDetailsResponse> showDetails();

}

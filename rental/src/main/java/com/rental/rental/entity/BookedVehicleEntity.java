package com.rental.rental.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BookedVehicleEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bookedVehicleId;
	private Long vehicleId;
	private Integer startTime;
	private Integer endTime;
	private String status;
	
	public Long getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Long vehicleId) {
		this.vehicleId = vehicleId;
	}
	public Integer getStartTime() {
		return startTime;
	}
	public void setStartTime(Integer startTime) {
		this.startTime = startTime;
	}
	public Integer getEndTime() {
		return endTime;
	}
	public void setEndTime(Integer endTime) {
		this.endTime = endTime;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Long getBookedVehicleId() {
		return bookedVehicleId;
	}
	public void setBookedVehicleId(Long bookedVehicleId) {
		this.bookedVehicleId = bookedVehicleId;
	}
	
	

}

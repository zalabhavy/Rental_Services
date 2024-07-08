package com.rental.rental.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Vehicle {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long vehicleId;
	private String vehicleType;
	private String vehicleName;
	private Long branchId;
	private Double pricePerHour;
    
	public Vehicle() {
    }
	
	public Vehicle(String vehicleType, String vehicleName, Long branchId, Double pricePerHour) {
		super();
		this.vehicleType = vehicleType;
		this.vehicleName = vehicleName;
		this.branchId = branchId;
		this.pricePerHour=pricePerHour;
	}
	

	public Long getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(Long vehicleId) {
		this.vehicleId = vehicleId;
	}

	public String getVehicleType() {
		return vehicleType;
	}
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}
	public String getVehicleName() {
		return vehicleName;
	}
	public void setVehicleName(String vehicleName) {
		this.vehicleName = vehicleName;
	}
	public Long getBranchId() {
		return branchId;
	}
	public void setBranchId(Long branchId) {
		this.branchId = branchId;
	}
	
	public Double getPricePerHour() {
		return pricePerHour;
	}

	public void setPricePerHour(Double pricePerHour) {
		this.pricePerHour = pricePerHour;
	}

	@Override
	public String toString() {
		return "Vehicle [vehicleId=" + vehicleId + ", vehicleType=" + vehicleType + ", vehicleName=" + vehicleName
				+ ", branchId=" + branchId + ", pricePerHour=" + pricePerHour + "]";
	}
	
    
}

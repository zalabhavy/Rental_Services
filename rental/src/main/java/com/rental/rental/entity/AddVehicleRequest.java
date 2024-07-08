package com.rental.rental.entity;

public class AddVehicleRequest {
	private String branchName;
	private String vehicleName;
	private String vehicleType;
	private Double pricePerHour;
	private Long count;
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getVehicleName() {
		return vehicleName;
	}
	public void setVehicleName(String vehicleName) {
		this.vehicleName = vehicleName;
	}
	public String getVehicleType() {
		return vehicleType;
	}
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}
	public Long getCount() {
		return count;
	}
	public void setCount(Long count) {
		this.count = count;
	}
	
	public Double getPricePerHour() {
		return pricePerHour;
	}
	public void setPricePerHour(Double pricePerHour) {
		this.pricePerHour = pricePerHour;
	}
	@Override
	public String toString() {
		return "AddVehicleRequest [branchName=" + branchName + ", vehicleName=" + vehicleName + ", vehicleType="
				+ vehicleType + ", pricePerHour=" + pricePerHour + ", count=" + count + "]";
	}
	

}

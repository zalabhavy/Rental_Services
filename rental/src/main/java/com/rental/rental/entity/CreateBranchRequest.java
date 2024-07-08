package com.rental.rental.entity;

public class CreateBranchRequest {
	private String branchName;
	private String branchLocation;
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getBranchLocation() {
		return branchLocation;
	}
	public void setBranchLocation(String branchLocation) {
		this.branchLocation = branchLocation;
	}
	@Override
	public String toString() {
		return "CreateBranchRequest [branchName=" + branchName + ", branchLocation=" + branchLocation + "]";
	}

}

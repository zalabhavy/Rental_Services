package com.rental.rental.entity;

import jakarta.validation.constraints.NotBlank;

public class CreateBranchRequest {
    @NotBlank(message = "Branch name is required")
    private String branchName;

    @NotBlank(message = "Branch location is required")
    private String branchLocation;

    private String contactPhone;
    private String contactEmail;
    private String description;
    private String imageUrl;

    public String getBranchName() { return branchName; }
    public void setBranchName(String branchName) { this.branchName = branchName; }
    public String getBranchLocation() { return branchLocation; }
    public void setBranchLocation(String branchLocation) { this.branchLocation = branchLocation; }
    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }
    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}

package com.rental.rental.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class BookedVehicleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookedVehicleId;

    private Long vehicleId;
    private Integer startTime;
    private Integer endTime;
    private String status;

    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private Double totalPrice;

    private LocalDateTime bookingDate;

    @PrePersist
    protected void onCreate() {
        this.bookingDate = LocalDateTime.now();
    }

    public Long getBookedVehicleId() { return bookedVehicleId; }
    public void setBookedVehicleId(Long bookedVehicleId) { this.bookedVehicleId = bookedVehicleId; }
    public Long getVehicleId() { return vehicleId; }
    public void setVehicleId(Long vehicleId) { this.vehicleId = vehicleId; }
    public Integer getStartTime() { return startTime; }
    public void setStartTime(Integer startTime) { this.startTime = startTime; }
    public Integer getEndTime() { return endTime; }
    public void setEndTime(Integer endTime) { this.endTime = endTime; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }
    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
    public LocalDateTime getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDateTime bookingDate) { this.bookingDate = bookingDate; }
}

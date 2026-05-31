package com.rental.rental.dto;

import java.util.List;
import java.util.Map;

public class DashboardStats {
    private long totalBranches;
    private long totalVehicles;
    private long totalBookings;
    private long activeBookings;
    private long cancelledBookings;
    private long completedBookings;
    private double totalRevenue;
    private List<Map<String, Object>> bookingsByVehicleType;
    private List<Map<String, Object>> revenueByBranch;
    private List<Map<String, Object>> recentBookings;

    public long getTotalBranches() { return totalBranches; }
    public void setTotalBranches(long totalBranches) { this.totalBranches = totalBranches; }
    public long getTotalVehicles() { return totalVehicles; }
    public void setTotalVehicles(long totalVehicles) { this.totalVehicles = totalVehicles; }
    public long getTotalBookings() { return totalBookings; }
    public void setTotalBookings(long totalBookings) { this.totalBookings = totalBookings; }
    public long getActiveBookings() { return activeBookings; }
    public void setActiveBookings(long activeBookings) { this.activeBookings = activeBookings; }
    public long getCancelledBookings() { return cancelledBookings; }
    public void setCancelledBookings(long cancelledBookings) { this.cancelledBookings = cancelledBookings; }
    public long getCompletedBookings() { return completedBookings; }
    public void setCompletedBookings(long completedBookings) { this.completedBookings = completedBookings; }
    public double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }
    public List<Map<String, Object>> getBookingsByVehicleType() { return bookingsByVehicleType; }
    public void setBookingsByVehicleType(List<Map<String, Object>> bookingsByVehicleType) { this.bookingsByVehicleType = bookingsByVehicleType; }
    public List<Map<String, Object>> getRevenueByBranch() { return revenueByBranch; }
    public void setRevenueByBranch(List<Map<String, Object>> revenueByBranch) { this.revenueByBranch = revenueByBranch; }
    public List<Map<String, Object>> getRecentBookings() { return recentBookings; }
    public void setRecentBookings(List<Map<String, Object>> recentBookings) { this.recentBookings = recentBookings; }
}

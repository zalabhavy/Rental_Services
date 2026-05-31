package com.rental.rental.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rental.rental.entity.BookedVehicleEntity;

@Repository
public interface IBookingManagmentDao extends JpaRepository<BookedVehicleEntity, Long> {

    @Query("SELECT b FROM BookedVehicleEntity b WHERE b.vehicleId = :vehicleId AND b.startTime = :startTime AND b.endTime = :endTime AND b.status = :status")
    BookedVehicleEntity getBookedVehicleEntityByVehicleIdByStartTimeByEndTime(
            @Param("vehicleId") Long vehicleId,
            @Param("startTime") Integer startTime,
            @Param("endTime") Integer endTime,
            @Param("status") String status);

    List<BookedVehicleEntity> findByStatus(String status);

    long countByStatus(String status);

    @Query("SELECT COALESCE(SUM(b.totalPrice), 0) FROM BookedVehicleEntity b WHERE b.status = 'ACTIVE'")
    double getTotalRevenue();

    @Query("SELECT b FROM BookedVehicleEntity b ORDER BY b.bookingDate DESC")
    List<BookedVehicleEntity> findRecentBookings();

    List<BookedVehicleEntity> findByCustomerEmailIgnoreCase(String customerEmail);

    List<BookedVehicleEntity> findByVehicleIdAndStatus(Long vehicleId, String status);

    List<BookedVehicleEntity> findByVehicleId(Long vehicleId);

    @Query("SELECT COUNT(b) FROM BookedVehicleEntity b WHERE b.vehicleId = :vehicleId AND b.status = 'ACTIVE'")
    long countActiveByVehicleId(@Param("vehicleId") Long vehicleId);
}

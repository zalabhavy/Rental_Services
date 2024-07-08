package com.rental.rental.dao;

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
        @Param("status") String status
    );

}

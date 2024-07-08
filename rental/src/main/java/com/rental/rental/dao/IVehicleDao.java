package com.rental.rental.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rental.rental.entity.Vehicle;

@Repository
public interface IVehicleDao extends JpaRepository<Vehicle, Long> {
    @Query("SELECT v FROM Vehicle v WHERE v.vehicleName = :vehicleName AND v.vehicleType = :vehicleType ORDER BY v.pricePerHour ASC")
    List<Vehicle> getVehicleByNameAndType(@Param("vehicleName") String vehicleName, @Param("vehicleType") String vehicleType);
}

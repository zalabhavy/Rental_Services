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

    List<Vehicle> findByBranchId(Long branchId);

    List<Vehicle> findByVehicleTypeIgnoreCase(String vehicleType);

    @Query("SELECT v FROM Vehicle v WHERE " +
           "(:vehicleType IS NULL OR LOWER(v.vehicleType) = LOWER(:vehicleType)) AND " +
           "(:branchId IS NULL OR v.branchId = :branchId) AND " +
           "(:minPrice IS NULL OR v.pricePerHour >= :minPrice) AND " +
           "(:maxPrice IS NULL OR v.pricePerHour <= :maxPrice) " +
           "ORDER BY v.pricePerHour ASC")
    List<Vehicle> searchVehicles(
            @Param("vehicleType") String vehicleType,
            @Param("branchId") Long branchId,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice);

    @Query("SELECT DISTINCT v.vehicleType FROM Vehicle v")
    List<String> findAllVehicleTypes();

    long countByBranchId(Long branchId);
}

package com.rental.rental.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rental.rental.entity.Branch;

@Repository
public interface IBranchDao extends JpaRepository<Branch,Long> {
	@Query("SELECT b.branchId FROM Branch b WHERE b.branchName = :branchName")
	Optional<Long> findByBranchName(String branchName);
}

package com.rental.rental.service;

import java.util.Optional;

import com.rental.rental.entity.Branch;
import com.rental.rental.entity.CreateBranchRequest;

public interface IBranchService {
	String createBranch(CreateBranchRequest createBranchRequest);

	Optional<Long> getBranchId(String branchName);

	Branch getById(Long branchId);
}

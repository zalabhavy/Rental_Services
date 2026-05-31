package com.rental.rental.service;

import java.util.List;
import java.util.Optional;

import com.rental.rental.entity.Branch;
import com.rental.rental.entity.CreateBranchRequest;

public interface IBranchService {
    Branch createBranch(CreateBranchRequest createBranchRequest);
    Optional<Long> getBranchId(String branchName);
    Branch getById(Long branchId);
    List<Branch> getAllBranches();
    Branch updateBranch(Long id, CreateBranchRequest request);
    void deleteBranch(Long id);
}

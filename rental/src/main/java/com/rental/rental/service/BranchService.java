package com.rental.rental.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rental.rental.dao.IBranchDao;
import com.rental.rental.entity.Branch;
import com.rental.rental.entity.CreateBranchRequest;
import com.rental.rental.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;

@Service
public class BranchService implements IBranchService {

    @Autowired
    IBranchDao branchDao;

    @Override
    @Transactional
    public Branch createBranch(CreateBranchRequest request) {
        Branch branch = new Branch(request.getBranchName(), request.getBranchLocation());
        branch.setContactPhone(request.getContactPhone());
        branch.setContactEmail(request.getContactEmail());
        branch.setDescription(request.getDescription());
        branch.setImageUrl(request.getImageUrl());
        return branchDao.save(branch);
    }

    @Override
    public Optional<Long> getBranchId(String branchName) {
        return branchDao.findByBranchName(branchName);
    }

    @Override
    public Branch getById(Long branchId) {
        return branchDao.findById(branchId)
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found with id: " + branchId));
    }

    @Override
    public List<Branch> getAllBranches() {
        return branchDao.findAll();
    }

    @Override
    @Transactional
    public Branch updateBranch(Long id, CreateBranchRequest request) {
        Branch branch = getById(id);
        branch.setBranchName(request.getBranchName());
        branch.setBranchLocation(request.getBranchLocation());
        if (request.getContactPhone() != null) branch.setContactPhone(request.getContactPhone());
        if (request.getContactEmail() != null) branch.setContactEmail(request.getContactEmail());
        if (request.getDescription() != null) branch.setDescription(request.getDescription());
        if (request.getImageUrl() != null) branch.setImageUrl(request.getImageUrl());
        return branchDao.save(branch);
    }

    @Override
    @Transactional
    public void deleteBranch(Long id) {
        if (!branchDao.existsById(id))
            throw new ResourceNotFoundException("Branch not found with id: " + id);
        branchDao.deleteById(id);
    }
}

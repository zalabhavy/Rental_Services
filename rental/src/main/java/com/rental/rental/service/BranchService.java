package com.rental.rental.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rental.rental.dao.IBranchDao;
import com.rental.rental.entity.Branch;
import com.rental.rental.entity.CreateBranchRequest;

import jakarta.transaction.Transactional;

@Service
public class BranchService implements IBranchService{
	
	@Autowired
	IBranchDao branchDao;
	
	@Transactional
	public String createBranch(CreateBranchRequest createBranchRequest) {
//		System.out.println("You are adding Branch with name:"+createBranchRequest.getBranchName()+ " and location:"+createBranchRequest.getBranchLocation());
		Branch branch=new Branch(createBranchRequest.getBranchName(),createBranchRequest.getBranchLocation());
	    branchDao.save(branch);
	    return "Branch Added SucessFully!!";
	}

	@Override
	public Optional<Long> getBranchId(String branchName) {
		return branchDao.findByBranchName(branchName);
	}

	@Override
	public Branch getById(Long branchId) {
		return branchDao.getReferenceById(branchId);
	}
	

}

package com.rental.rental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rental.rental.dto.ApiResponse;
import com.rental.rental.entity.Branch;
import com.rental.rental.entity.CreateBranchRequest;
import com.rental.rental.service.IBranchService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/branches")
@Tag(name = "Branch Management", description = "APIs for managing rental branches")
public class BranchController {

    @Autowired
    IBranchService branchService;

    @GetMapping
    @Operation(summary = "Get all branches", description = "Retrieve a list of all rental branches")
    public ResponseEntity<ApiResponse<List<Branch>>> getAllBranches() {
        List<Branch> branches = branchService.getAllBranches();
        return ResponseEntity.ok(ApiResponse.success("Branches retrieved successfully", branches));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get branch by ID")
    public ResponseEntity<ApiResponse<Branch>> getBranchById(@PathVariable Long id) {
        Branch branch = branchService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Branch retrieved successfully", branch));
    }

    @PostMapping
    @Operation(summary = "Create a new branch")
    public ResponseEntity<ApiResponse<Branch>> createBranch(@Valid @RequestBody CreateBranchRequest request) {
        Branch branch = branchService.createBranch(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Branch created successfully", branch));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing branch")
    public ResponseEntity<ApiResponse<Branch>> updateBranch(@PathVariable Long id, @Valid @RequestBody CreateBranchRequest request) {
        Branch branch = branchService.updateBranch(id, request);
        return ResponseEntity.ok(ApiResponse.success("Branch updated successfully", branch));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a branch")
    public ResponseEntity<ApiResponse<Void>> deleteBranch(@PathVariable Long id) {
        branchService.deleteBranch(id);
        return ResponseEntity.ok(ApiResponse.success("Branch deleted successfully"));
    }
}

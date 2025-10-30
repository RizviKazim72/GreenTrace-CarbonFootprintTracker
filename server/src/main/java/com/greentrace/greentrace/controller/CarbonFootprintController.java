package com.greentrace.greentrace.controller;

import com.greentrace.greentrace.model.dto.request.CarbonCalculationRequest;
import com.greentrace.greentrace.model.dto.response.CarbonCalculationResponse;
import com.greentrace.greentrace.model.entity.CarbonFootprint;
import com.greentrace.greentrace.model.entity.Company;
import com.greentrace.greentrace.model.entity.User;
import com.greentrace.greentrace.repository.CompanyRepository;
import com.greentrace.greentrace.service.CarbonFootprintService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carbon-footprint")
@RequiredArgsConstructor
public class CarbonFootprintController {
    
    private final CarbonFootprintService carbonFootprintService;
    private final CompanyRepository companyRepository;
    
    @PostMapping("/calculate")
    public ResponseEntity<CarbonCalculationResponse> calculate(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody CarbonCalculationRequest request
    ) {
        Company company = companyRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        CarbonCalculationResponse response = carbonFootprintService.calculateCarbonFootprint(
                company.getId(), 
                request
        );
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/history")
    public ResponseEntity<Page<CarbonFootprint>> getHistory(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Company company = companyRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        Pageable pageable = PageRequest.of(page, size);
        Page<CarbonFootprint> history = carbonFootprintService.getHistory(company.getId(), pageable);
        return ResponseEntity.ok(history);
    }
    
    @GetMapping("/history/all")
    public ResponseEntity<List<CarbonFootprint>> getAllHistory(@AuthenticationPrincipal User user) {
        Company company = companyRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        List<CarbonFootprint> history = carbonFootprintService.getAllHistory(company.getId());
        return ResponseEntity.ok(history);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CarbonFootprint> getById(@PathVariable Long id) {
        CarbonFootprint footprint = carbonFootprintService.getById(id);
        return ResponseEntity.ok(footprint);
    }
}

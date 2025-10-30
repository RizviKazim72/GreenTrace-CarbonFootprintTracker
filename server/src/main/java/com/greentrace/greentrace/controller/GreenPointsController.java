package com.greentrace.greentrace.controller;

import com.greentrace.greentrace.model.entity.Company;
import com.greentrace.greentrace.model.entity.GreenPointsTransaction;
import com.greentrace.greentrace.model.entity.User;
import com.greentrace.greentrace.repository.CompanyRepository;
import com.greentrace.greentrace.service.GreenPointsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/green-points")
@RequiredArgsConstructor
public class GreenPointsController {
    
    private final GreenPointsService greenPointsService;
    private final CompanyRepository companyRepository;
    
    @GetMapping("/balance")
    public ResponseEntity<Map<String, Integer>> getBalance(@AuthenticationPrincipal User user) {
        Company company = companyRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        Map<String, Integer> response = new HashMap<>();
        response.put("balance", company.getGreenPoints());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/history")
    public ResponseEntity<Page<GreenPointsTransaction>> getHistory(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Company company = companyRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        Pageable pageable = PageRequest.of(page, size);
        Page<GreenPointsTransaction> history = greenPointsService.getTransactionHistory(
                company.getId(), 
                pageable
        );
        return ResponseEntity.ok(history);
    }
    
    @GetMapping("/transactions")
    public ResponseEntity<List<GreenPointsTransaction>> getAllTransactions(
            @AuthenticationPrincipal User user
    ) {
        Company company = companyRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        List<GreenPointsTransaction> transactions = greenPointsService.getAllTransactions(company.getId());
        return ResponseEntity.ok(transactions);
    }
}

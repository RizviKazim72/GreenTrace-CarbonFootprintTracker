package com.greentrace.greentrace.controller;

import com.greentrace.greentrace.model.entity.Company;
import com.greentrace.greentrace.model.entity.User;
import com.greentrace.greentrace.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {
    
    private final CompanyService companyService;
    
    @GetMapping("/profile")
    public ResponseEntity<Company> getCompanyProfile(@AuthenticationPrincipal User user) {
        Company company = companyService.getCompanyByUserId(user.getId());
        return ResponseEntity.ok(company);
    }
    
    @PutMapping("/profile")
    public ResponseEntity<Company> updateCompanyProfile(
            @AuthenticationPrincipal User user,
            @RequestBody Company updateRequest) {
        Company company = companyService.updateCompany(user.getId(), updateRequest);
        return ResponseEntity.ok(company);
    }
}

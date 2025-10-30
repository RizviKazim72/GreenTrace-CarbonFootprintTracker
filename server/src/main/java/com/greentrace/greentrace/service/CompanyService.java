package com.greentrace.greentrace.service;

import com.greentrace.greentrace.model.entity.Company;
import com.greentrace.greentrace.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CompanyService {
    
    private final CompanyRepository companyRepository;
    
    public Company getCompanyByUserId(Long userId) {
        return companyRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
    }
    
    public Company updateCompany(Long userId, Company updateRequest) {
        Company company = getCompanyByUserId(userId);
        
        // Update fields
        if (updateRequest.getName() != null) {
            company.setName(updateRequest.getName());
        }
        if (updateRequest.getIndustry() != null) {
            company.setIndustry(updateRequest.getIndustry());
        }
        if (updateRequest.getSize() != null) {
            company.setSize(updateRequest.getSize());
        }
        if (updateRequest.getAddress() != null) {
            company.setAddress(updateRequest.getAddress());
        }
        if (updateRequest.getPhone() != null) {
            company.setPhone(updateRequest.getPhone());
        }
        if (updateRequest.getWebsite() != null) {
            company.setWebsite(updateRequest.getWebsite());
        }
        if (updateRequest.getDescription() != null) {
            company.setDescription(updateRequest.getDescription());
        }
        if (updateRequest.getLogoUrl() != null) {
            company.setLogoUrl(updateRequest.getLogoUrl());
        }
        
        return companyRepository.save(company);
    }
}

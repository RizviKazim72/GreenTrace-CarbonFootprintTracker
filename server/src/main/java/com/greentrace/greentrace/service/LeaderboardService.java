package com.greentrace.greentrace.service;

import com.greentrace.greentrace.model.entity.Company;
import com.greentrace.greentrace.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaderboardService {
    
    private final CompanyRepository companyRepository;
    
    public List<Company> getTopCompanies(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return companyRepository.findTopCompaniesByGreenPoints(pageable);
    }
    
    public List<Company> getTopCompaniesByIndustry(Company.Industry industry, int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return companyRepository.findTopCompaniesByIndustryAndGreenPoints(industry, pageable);
    }
    
    public Page<Company> getCompaniesByIndustry(Company.Industry industry, Pageable pageable) {
        return companyRepository.findByIndustry(industry, pageable);
    }
    
    public Double getIndustryAverage(Company.Industry industry) {
        return companyRepository.findAverageCarbonFootprintByIndustry(industry);
    }
    
    public java.util.Map<String, Object> getMyRanking(Long userId) {
        Company company = companyRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        List<Company> allCompanies = getTopCompanies(1000);
        int rank = 1;
        for (Company c : allCompanies) {
            if (c.getId().equals(company.getId())) {
                break;
            }
            rank++;
        }
        
        java.util.Map<String, Object> response = new java.util.HashMap<>();
        response.put("rank", rank);
        response.put("companyId", company.getId());
        response.put("companyName", company.getName());
        response.put("industry", company.getIndustry().toString());
        response.put("greenPoints", company.getGreenPoints());
        
        return response;
    }
}

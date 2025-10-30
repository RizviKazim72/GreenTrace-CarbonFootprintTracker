package com.greentrace.greentrace.service;

import com.greentrace.greentrace.model.entity.Company;
import com.greentrace.greentrace.model.entity.GreenPointsTransaction;
import com.greentrace.greentrace.repository.CompanyRepository;
import com.greentrace.greentrace.repository.GreenPointsTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GreenPointsService {
    
    private final GreenPointsTransactionRepository transactionRepository;
    private final CompanyRepository companyRepository;
    
    // Industry benchmarks (kg CO2 per month)
    private static final double TECH_BENCHMARK = 15000;
    private static final double MANUFACTURING_BENCHMARK = 45000;
    private static final double RETAIL_BENCHMARK = 25000;
    private static final double DEFAULT_BENCHMARK = 25000;
    
    @Transactional
    public void awardPointsForCalculation(Company company, double carbonFootprint) {
        int points = calculatePoints(company, carbonFootprint);
        
        if (points > 0) {
            // Create transaction
            GreenPointsTransaction transaction = GreenPointsTransaction.builder()
                    .company(company)
                    .points(points)
                    .type(GreenPointsTransaction.TransactionType.EARNED)
                    .description("Points earned for carbon footprint calculation")
                    .reason("CALCULATION")
                    .build();
            
            transactionRepository.save(transaction);
            
            // Update company points
            company.setGreenPoints(company.getGreenPoints() + points);
            companyRepository.save(company);
        }
    }
    
    private int calculatePoints(Company company, double carbonFootprint) {
        double benchmark = getBenchmarkForIndustry(company.getIndustry());
        
        // Base points if below benchmark
        if (carbonFootprint < benchmark) {
            double savingsPercent = ((benchmark - carbonFootprint) / benchmark) * 100;
            return (int) (savingsPercent * 10); // 10 points per 1% below average
        }
        
        return 50; // Minimum points for participation
    }
    
    private double getBenchmarkForIndustry(Company.Industry industry) {
        return switch (industry) {
            case TECHNOLOGY -> TECH_BENCHMARK;
            case MANUFACTURING -> MANUFACTURING_BENCHMARK;
            case RETAIL -> RETAIL_BENCHMARK;
            default -> DEFAULT_BENCHMARK;
        };
    }
    
    public Page<GreenPointsTransaction> getTransactionHistory(Long companyId, Pageable pageable) {
        return transactionRepository.findByCompanyIdOrderByCreatedAtDesc(companyId, pageable);
    }
    
    public List<GreenPointsTransaction> getAllTransactions(Long companyId) {
        return transactionRepository.findByCompanyIdOrderByCreatedAtDesc(companyId);
    }
    
    public Integer getTotalPoints(Long companyId) {
        return transactionRepository.findTotalPointsByCompanyId(companyId);
    }
}

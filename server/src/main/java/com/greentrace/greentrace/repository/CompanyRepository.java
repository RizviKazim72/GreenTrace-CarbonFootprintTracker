package com.greentrace.greentrace.repository;

import com.greentrace.greentrace.model.entity.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByUserId(Long userId);
    
    Page<Company> findByIndustry(Company.Industry industry, Pageable pageable);
    
    @Query("SELECT c FROM Company c ORDER BY c.greenPoints DESC")
    List<Company> findTopCompaniesByGreenPoints(Pageable pageable);
    
    @Query("SELECT c FROM Company c WHERE c.industry = :industry ORDER BY c.greenPoints DESC")
    List<Company> findTopCompaniesByIndustryAndGreenPoints(Company.Industry industry, Pageable pageable);
    
    @Query("SELECT AVG(c.totalFootprint) FROM Company c WHERE c.industry = :industry")
    Double findAverageCarbonFootprintByIndustry(Company.Industry industry);
}

package com.greentrace.greentrace.repository;

import com.greentrace.greentrace.model.entity.CarbonFootprint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CarbonFootprintRepository extends JpaRepository<CarbonFootprint, Long> {
    Page<CarbonFootprint> findByCompanyIdOrderByCreatedAtDesc(Long companyId, Pageable pageable);
    
    List<CarbonFootprint> findByCompanyIdOrderByCreatedAtDesc(Long companyId);
    
    Optional<CarbonFootprint> findByCompanyIdAndCalculationPeriod(Long companyId, String calculationPeriod);
    
    @Query("SELECT cf FROM CarbonFootprint cf WHERE cf.company.id = :companyId AND cf.createdAt BETWEEN :startDate AND :endDate ORDER BY cf.createdAt DESC")
    List<CarbonFootprint> findByCompanyIdAndDateRange(Long companyId, LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT SUM(cf.totalEmissions) FROM CarbonFootprint cf WHERE cf.company.id = :companyId")
    Double findTotalEmissionsByCompanyId(Long companyId);
}

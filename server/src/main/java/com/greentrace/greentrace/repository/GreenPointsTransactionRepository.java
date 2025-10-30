package com.greentrace.greentrace.repository;

import com.greentrace.greentrace.model.entity.GreenPointsTransaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GreenPointsTransactionRepository extends JpaRepository<GreenPointsTransaction, Long> {
    Page<GreenPointsTransaction> findByCompanyIdOrderByCreatedAtDesc(Long companyId, Pageable pageable);
    
    List<GreenPointsTransaction> findByCompanyIdOrderByCreatedAtDesc(Long companyId);
    
    @Query("SELECT SUM(t.points) FROM GreenPointsTransaction t WHERE t.company.id = :companyId")
    Integer findTotalPointsByCompanyId(Long companyId);
}

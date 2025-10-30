package com.greentrace.greentrace.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "green_points_transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GreenPointsTransaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;
    
    @Column(nullable = false)
    private Integer points;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type;
    
    @Column(length = 500)
    private String description;
    
    @Column(length = 100)
    private String reason;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Transient field for API response
    @Transient
    public String getActivity() {
        if (description != null && !description.isEmpty()) {
            return description;
        }
        if (reason != null && !reason.isEmpty()) {
            return reason;
        }
        return type.toString().replace("_", " ");
    }
    
    public enum TransactionType {
        EARNED,
        DEDUCTED,
        BONUS,
        MILESTONE
    }
}

package com.greentrace.greentrace.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Industry industry;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CompanySize size;
    
    @Column(length = 1000)
    private String description;
    
    private String website;
    
    private String address;
    
    private String phone;
    
    @Column(name = "logo_url")
    private String logoUrl;
    
    @Column(name = "green_points", nullable = false)
    @Builder.Default
    private Integer greenPoints = 0;
    
    @Column(name = "total_footprint", nullable = false)
    @Builder.Default
    private Double totalFootprint = 0.0;
    
    @Column(name = "last_calculation_date")
    private LocalDateTime lastCalculationDate;
    
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @JsonIgnore
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<CarbonFootprint> carbonFootprints = new ArrayList<>();
    
    @JsonIgnore
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<GreenPointsTransaction> pointsTransactions = new ArrayList<>();
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum Industry {
        TECHNOLOGY,
        MANUFACTURING,
        RETAIL,
        HEALTHCARE,
        EDUCATION,
        HOSPITALITY,
        FINANCE,
        LOGISTICS,
        FOOD_BEVERAGE,
        CONSTRUCTION,
        ENERGY,
        AGRICULTURE,
        OTHER
    }
    
    public enum CompanySize {
        SMALL,      // 1-50
        MEDIUM,     // 51-250
        LARGE,      // 251-1000
        ENTERPRISE  // 1000+
    }
}

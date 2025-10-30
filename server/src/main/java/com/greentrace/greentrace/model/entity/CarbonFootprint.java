package com.greentrace.greentrace.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "carbon_footprints")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CarbonFootprint {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;
    
    @Column(name = "total_emissions", nullable = false)
    private Double totalEmissions; // in kg CO2
    
    @Column(name = "scope1_emissions", nullable = false)
    private Double scope1Emissions;
    
    @Column(name = "scope2_emissions", nullable = false)
    private Double scope2Emissions;
    
    @Column(name = "scope3_emissions", nullable = false)
    private Double scope3Emissions;
    
    @Column(name = "calculation_period")
    private String calculationPeriod; // e.g., "2024-01"
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "carbon_footprint_breakdown", 
                    joinColumns = @JoinColumn(name = "footprint_id"))
    @MapKeyColumn(name = "category")
    @Column(name = "value")
    private Map<String, Double> breakdown;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "carbon_footprint_inputs",
                    joinColumns = @JoinColumn(name = "footprint_id"))
    @MapKeyColumn(name = "input_key")
    @Column(name = "input_value")
    private Map<String, Double> inputs;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

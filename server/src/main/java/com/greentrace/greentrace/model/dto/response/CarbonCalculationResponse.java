package com.greentrace.greentrace.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CarbonCalculationResponse {
    private Long id;
    private Double totalEmissions;
    private Double scope1Emissions;
    private Double scope2Emissions;
    private Double scope3Emissions;
    private Map<String, Double> breakdown;
    private String calculationPeriod;
    private LocalDateTime createdAt;
}

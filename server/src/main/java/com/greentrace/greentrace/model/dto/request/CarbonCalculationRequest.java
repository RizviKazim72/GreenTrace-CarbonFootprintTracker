package com.greentrace.greentrace.model.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CarbonCalculationRequest {
    
    // Electricity (kWh)
    @PositiveOrZero(message = "Electricity usage must be zero or positive")
    private Double electricity;
    
    // Fuel (liters)
    @PositiveOrZero(message = "Fuel petrol usage must be zero or positive")
    private Double fuelPetrol;
    
    @PositiveOrZero(message = "Fuel diesel usage must be zero or positive")
    private Double fuelDiesel;
    
    // Transportation (km)
    @PositiveOrZero(message = "Transport car petrol must be zero or positive")
    private Double transportCarPetrol;
    
    @PositiveOrZero(message = "Transport car diesel must be zero or positive")
    private Double transportCarDiesel;
    
    @PositiveOrZero(message = "Transport truck must be zero or positive")
    private Double transportTruck;
    
    // Waste (kg)
    @PositiveOrZero(message = "Waste landfill must be zero or positive")
    private Double wasteLandfill;
    
    @PositiveOrZero(message = "Waste recycled must be zero or positive")
    private Double wasteRecycled;
    
    // Water (m³)
    @PositiveOrZero(message = "Water usage must be zero or positive")
    private Double water;
    
    // Paper (kg)
    @PositiveOrZero(message = "Paper usage must be zero or positive")
    private Double paper;
    
    // Calculation period (e.g., "2024-01")
    @NotNull(message = "Calculation period is required")
    private String calculationPeriod;
}

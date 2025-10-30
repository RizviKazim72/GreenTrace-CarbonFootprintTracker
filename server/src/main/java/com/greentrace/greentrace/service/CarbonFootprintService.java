package com.greentrace.greentrace.service;

import com.greentrace.greentrace.model.dto.request.CarbonCalculationRequest;
import com.greentrace.greentrace.model.dto.response.CarbonCalculationResponse;
import com.greentrace.greentrace.model.entity.CarbonFootprint;
import com.greentrace.greentrace.model.entity.Company;
import com.greentrace.greentrace.repository.CarbonFootprintRepository;
import com.greentrace.greentrace.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CarbonFootprintService {
    
    private final CarbonFootprintRepository carbonFootprintRepository;
    private final CompanyRepository companyRepository;
    private final GreenPointsService greenPointsService;
    
    // Emission factors (kg CO2 per unit)
    private static final Map<String, Double> EMISSION_FACTORS = Map.ofEntries(
            Map.entry("ELECTRICITY", 0.92),        // per kWh
            Map.entry("FUEL_PETROL", 2.31),        // per liter
            Map.entry("FUEL_DIESEL", 2.68),        // per liter
            Map.entry("TRANSPORT_CAR_PETROL", 0.192),  // per km
            Map.entry("TRANSPORT_CAR_DIESEL", 0.171),  // per km
            Map.entry("TRANSPORT_TRUCK", 0.285),   // per km
            Map.entry("WASTE_LANDFILL", 0.5),      // per kg
            Map.entry("WASTE_RECYCLED", 0.1),      // per kg
            Map.entry("WATER", 0.344),             // per m³
            Map.entry("PAPER", 1.8)                // per kg
    );
    
    @Transactional
    public CarbonCalculationResponse calculateCarbonFootprint(Long companyId, CarbonCalculationRequest request) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        // Calculate emissions
        Map<String, Double> breakdown = new HashMap<>();
        double scope1 = 0, scope2 = 0, scope3 = 0;
        
        // Scope 2 - Electricity
        if (request.getElectricity() != null && request.getElectricity() > 0) {
            double emissions = request.getElectricity() * EMISSION_FACTORS.get("ELECTRICITY");
            breakdown.put("electricity", emissions);
            scope2 += emissions;
        }
        
        // Scope 1 - Fuel
        if (request.getFuelPetrol() != null && request.getFuelPetrol() > 0) {
            double emissions = request.getFuelPetrol() * EMISSION_FACTORS.get("FUEL_PETROL");
            breakdown.put("fuelPetrol", emissions);
            scope1 += emissions;
        }
        if (request.getFuelDiesel() != null && request.getFuelDiesel() > 0) {
            double emissions = request.getFuelDiesel() * EMISSION_FACTORS.get("FUEL_DIESEL");
            breakdown.put("fuelDiesel", emissions);
            scope1 += emissions;
        }
        
        // Scope 3 - Transportation
        if (request.getTransportCarPetrol() != null && request.getTransportCarPetrol() > 0) {
            double emissions = request.getTransportCarPetrol() * EMISSION_FACTORS.get("TRANSPORT_CAR_PETROL");
            breakdown.put("transportCarPetrol", emissions);
            scope3 += emissions;
        }
        if (request.getTransportCarDiesel() != null && request.getTransportCarDiesel() > 0) {
            double emissions = request.getTransportCarDiesel() * EMISSION_FACTORS.get("TRANSPORT_CAR_DIESEL");
            breakdown.put("transportCarDiesel", emissions);
            scope3 += emissions;
        }
        if (request.getTransportTruck() != null && request.getTransportTruck() > 0) {
            double emissions = request.getTransportTruck() * EMISSION_FACTORS.get("TRANSPORT_TRUCK");
            breakdown.put("transportTruck", emissions);
            scope3 += emissions;
        }
        
        // Scope 3 - Waste
        if (request.getWasteLandfill() != null && request.getWasteLandfill() > 0) {
            double emissions = request.getWasteLandfill() * EMISSION_FACTORS.get("WASTE_LANDFILL");
            breakdown.put("wasteLandfill", emissions);
            scope3 += emissions;
        }
        if (request.getWasteRecycled() != null && request.getWasteRecycled() > 0) {
            double emissions = request.getWasteRecycled() * EMISSION_FACTORS.get("WASTE_RECYCLED");
            breakdown.put("wasteRecycled", emissions);
            scope3 += emissions;
        }
        
        // Scope 3 - Water & Paper
        if (request.getWater() != null && request.getWater() > 0) {
            double emissions = request.getWater() * EMISSION_FACTORS.get("WATER");
            breakdown.put("water", emissions);
            scope3 += emissions;
        }
        if (request.getPaper() != null && request.getPaper() > 0) {
            double emissions = request.getPaper() * EMISSION_FACTORS.get("PAPER");
            breakdown.put("paper", emissions);
            scope3 += emissions;
        }
        
        double totalEmissions = scope1 + scope2 + scope3;
        
        // Save carbon footprint
        Map<String, Double> inputs = new HashMap<>();
        if (request.getElectricity() != null) inputs.put("electricity", request.getElectricity());
        if (request.getFuelPetrol() != null) inputs.put("fuelPetrol", request.getFuelPetrol());
        if (request.getFuelDiesel() != null) inputs.put("fuelDiesel", request.getFuelDiesel());
        if (request.getTransportCarPetrol() != null) inputs.put("transportCarPetrol", request.getTransportCarPetrol());
        if (request.getTransportCarDiesel() != null) inputs.put("transportCarDiesel", request.getTransportCarDiesel());
        if (request.getTransportTruck() != null) inputs.put("transportTruck", request.getTransportTruck());
        if (request.getWasteLandfill() != null) inputs.put("wasteLandfill", request.getWasteLandfill());
        if (request.getWasteRecycled() != null) inputs.put("wasteRecycled", request.getWasteRecycled());
        if (request.getWater() != null) inputs.put("water", request.getWater());
        if (request.getPaper() != null) inputs.put("paper", request.getPaper());
        
        CarbonFootprint footprint = CarbonFootprint.builder()
                .company(company)
                .totalEmissions(totalEmissions)
                .scope1Emissions(scope1)
                .scope2Emissions(scope2)
                .scope3Emissions(scope3)
                .calculationPeriod(request.getCalculationPeriod())
                .breakdown(breakdown)
                .inputs(inputs)
                .build();
        
        footprint = carbonFootprintRepository.save(footprint);
        
        // Update company total footprint
        company.setTotalFootprint(totalEmissions);
        company.setLastCalculationDate(LocalDateTime.now());
        companyRepository.save(company);
        
        // Award green points
        greenPointsService.awardPointsForCalculation(company, totalEmissions);
        
        return CarbonCalculationResponse.builder()
                .id(footprint.getId())
                .totalEmissions(totalEmissions)
                .scope1Emissions(scope1)
                .scope2Emissions(scope2)
                .scope3Emissions(scope3)
                .breakdown(breakdown)
                .calculationPeriod(request.getCalculationPeriod())
                .createdAt(footprint.getCreatedAt())
                .build();
    }
    
    public Page<CarbonFootprint> getHistory(Long companyId, Pageable pageable) {
        return carbonFootprintRepository.findByCompanyIdOrderByCreatedAtDesc(companyId, pageable);
    }
    
    public List<CarbonFootprint> getAllHistory(Long companyId) {
        return carbonFootprintRepository.findByCompanyIdOrderByCreatedAtDesc(companyId);
    }
    
    public CarbonFootprint getById(Long id) {
        return carbonFootprintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Carbon footprint not found"));
    }
}

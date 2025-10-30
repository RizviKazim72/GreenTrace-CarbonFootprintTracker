import { EMISSION_FACTORS, EMISSION_SCOPES, UNIT_CONVERSIONS } from '@/constants';

/**
 * Calculate carbon footprint from input data
 * @param {Object} inputs - Input data object
 * @returns {Object} Calculation result with emissions breakdown
 */
export const calculateCarbonFootprint = (inputs) => {
  const emissions = {
    total: 0,
    scope1: 0,
    scope2: 0,
    scope3: 0,
    breakdown: {},
  };

  // Electricity (Scope 2)
  if (inputs.electricity) {
    const electricityEmissions = 
      inputs.electricity * EMISSION_FACTORS.ELECTRICITY.GRID_AVERAGE;
    emissions.scope2 += electricityEmissions;
    emissions.breakdown.electricity = electricityEmissions;
  }

  // Fuel - Petrol (Scope 1)
  if (inputs.fuelPetrol) {
    const petrolEmissions = 
      inputs.fuelPetrol * EMISSION_FACTORS.FUEL.PETROL;
    emissions.scope1 += petrolEmissions;
    emissions.breakdown.fuelPetrol = petrolEmissions;
  }

  // Fuel - Diesel (Scope 1)
  if (inputs.fuelDiesel) {
    const dieselEmissions = 
      inputs.fuelDiesel * EMISSION_FACTORS.FUEL.DIESEL;
    emissions.scope1 += dieselEmissions;
    emissions.breakdown.fuelDiesel = dieselEmissions;
  }

  // Transportation - Car Petrol (Scope 3)
  if (inputs.transportCarPetrol) {
    const carPetrolEmissions = 
      inputs.transportCarPetrol * EMISSION_FACTORS.TRANSPORT.CAR_PETROL;
    emissions.scope3 += carPetrolEmissions;
    emissions.breakdown.transportCarPetrol = carPetrolEmissions;
  }

  // Transportation - Car Diesel (Scope 3)
  if (inputs.transportCarDiesel) {
    const carDieselEmissions = 
      inputs.transportCarDiesel * EMISSION_FACTORS.TRANSPORT.CAR_DIESEL;
    emissions.scope3 += carDieselEmissions;
    emissions.breakdown.transportCarDiesel = carDieselEmissions;
  }

  // Transportation - Truck (Scope 3)
  if (inputs.transportTruck) {
    const truckEmissions = 
      inputs.transportTruck * EMISSION_FACTORS.TRANSPORT.TRUCK;
    emissions.scope3 += truckEmissions;
    emissions.breakdown.transportTruck = truckEmissions;
  }

  // Waste - Landfill (Scope 3)
  if (inputs.wasteLandfill) {
    const landfillEmissions = 
      inputs.wasteLandfill * EMISSION_FACTORS.WASTE.LANDFILL;
    emissions.scope3 += landfillEmissions;
    emissions.breakdown.wasteLandfill = landfillEmissions;
  }

  // Waste - Recycled (Scope 3)
  if (inputs.wasteRecycled) {
    const recycledEmissions = 
      inputs.wasteRecycled * EMISSION_FACTORS.WASTE.RECYCLED;
    emissions.scope3 += recycledEmissions;
    emissions.breakdown.wasteRecycled = recycledEmissions;
  }

  // Water (Scope 3)
  if (inputs.water) {
    const waterEmissions = 
      inputs.water * EMISSION_FACTORS.WATER;
    emissions.scope3 += waterEmissions;
    emissions.breakdown.water = waterEmissions;
  }

  // Paper (Scope 3)
  if (inputs.paper) {
    const paperEmissions = 
      inputs.paper * EMISSION_FACTORS.PAPER;
    emissions.scope3 += paperEmissions;
    emissions.breakdown.paper = paperEmissions;
  }

  // Calculate total
  emissions.total = emissions.scope1 + emissions.scope2 + emissions.scope3;

  // Convert to tons if needed
  const totalTons = emissions.total * UNIT_CONVERSIONS.KG_TO_TONS;

  return {
    totalKg: emissions.total,
    totalTons,
    scope1: emissions.scope1,
    scope2: emissions.scope2,
    scope3: emissions.scope3,
    breakdown: emissions.breakdown,
    scopes: {
      scope1: {
        ...EMISSION_SCOPES.SCOPE_1,
        value: emissions.scope1,
        percentage: (emissions.scope1 / emissions.total) * 100,
      },
      scope2: {
        ...EMISSION_SCOPES.SCOPE_2,
        value: emissions.scope2,
        percentage: (emissions.scope2 / emissions.total) * 100,
      },
      scope3: {
        ...EMISSION_SCOPES.SCOPE_3,
        value: emissions.scope3,
        percentage: (emissions.scope3 / emissions.total) * 100,
      },
    },
  };
};

/**
 * Calculate green points based on carbon footprint
 * @param {Object} params - Calculation parameters
 * @returns {number} Points earned
 */
export const calculateGreenPoints = (params) => {
  const {
    currentFootprint,
    previousFootprint,
    industryAverage,
    isFirstCalculation = false,
  } = params;

  let points = 0;

  // First calculation bonus
  if (isFirstCalculation) {
    points += 500;
  }

  // Below industry average bonus
  if (currentFootprint < industryAverage) {
    const savingsPercent = ((industryAverage - currentFootprint) / industryAverage) * 100;
    points += Math.floor(savingsPercent * 10); // 10 points per 1% below average
  }

  // Improvement from previous month
  if (previousFootprint && currentFootprint < previousFootprint) {
    const improvementPercent = ((previousFootprint - currentFootprint) / previousFootprint) * 100;
    points += Math.floor(improvementPercent * 50); // 50 points per 1% improvement
  }

  return points;
};

/**
 * Get emission reduction recommendations
 * @param {Object} emissions - Emissions breakdown
 * @returns {Array} Array of recommendations
 */
export const getRecommendations = (emissions) => {
  const recommendations = [];
  const { breakdown } = emissions;

  // Electricity recommendations
  if (breakdown.electricity > 1000) {
    recommendations.push({
      category: 'electricity',
      priority: 'high',
      title: 'Reduce Electricity Consumption',
      description: 'Consider switching to renewable energy sources or implementing energy-efficient equipment.',
      potentialSavings: breakdown.electricity * 0.3, // 30% potential reduction
    });
  }

  // Fuel recommendations
  const totalFuel = (breakdown.fuelPetrol || 0) + (breakdown.fuelDiesel || 0);
  if (totalFuel > 500) {
    recommendations.push({
      category: 'fuel',
      priority: 'high',
      title: 'Optimize Fuel Usage',
      description: 'Consider fleet optimization, route planning, or transitioning to electric vehicles.',
      potentialSavings: totalFuel * 0.25,
    });
  }

  // Transportation recommendations
  const totalTransport = 
    (breakdown.transportCarPetrol || 0) + 
    (breakdown.transportCarDiesel || 0) + 
    (breakdown.transportTruck || 0);
  if (totalTransport > 300) {
    recommendations.push({
      category: 'transportation',
      priority: 'medium',
      title: 'Improve Transportation Efficiency',
      description: 'Encourage carpooling, remote work, or public transportation for employees.',
      potentialSavings: totalTransport * 0.2,
    });
  }

  // Waste recommendations
  const totalWaste = (breakdown.wasteLandfill || 0) + (breakdown.wasteRecycled || 0);
  if (breakdown.wasteLandfill > breakdown.wasteRecycled) {
    recommendations.push({
      category: 'waste',
      priority: 'medium',
      title: 'Increase Recycling Efforts',
      description: 'Implement a comprehensive recycling program to reduce landfill waste.',
      potentialSavings: (breakdown.wasteLandfill || 0) * 0.4,
    });
  }

  // Water recommendations
  if (breakdown.water > 50) {
    recommendations.push({
      category: 'water',
      priority: 'low',
      title: 'Water Conservation',
      description: 'Install water-efficient fixtures and implement water recycling systems.',
      potentialSavings: breakdown.water * 0.15,
    });
  }

  // Sort by priority
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recommendations;
};

/**
 * Compare with industry benchmark
 * @param {number} footprint - Company's carbon footprint (kg CO2)
 * @param {number} benchmark - Industry average (kg CO2)
 * @returns {Object} Comparison result
 */
export const compareWithBenchmark = (footprint, benchmark) => {
  const difference = footprint - benchmark;
  const percentageDiff = (difference / benchmark) * 100;

  return {
    footprint,
    benchmark,
    difference,
    percentageDiff,
    status: difference < 0 ? 'below' : difference > 0 ? 'above' : 'equal',
    rating: getRating(percentageDiff),
  };
};

/**
 * Get rating based on performance
 * @param {number} percentageDiff - Percentage difference from benchmark
 * @returns {string} Rating (A, B, C, D, F)
 */
const getRating = (percentageDiff) => {
  if (percentageDiff <= -30) return 'A';
  if (percentageDiff <= -15) return 'B';
  if (percentageDiff <= 0) return 'C';
  if (percentageDiff <= 20) return 'D';
  return 'F';
};

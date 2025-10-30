/**
 * Carbon Footprint Calculation Constants
 * Based on standard emission factors from EPA and other environmental agencies
 */

// Emission factors (kg CO2 per unit)
export const EMISSION_FACTORS = {
  // Electricity (kg CO2 per kWh)
  ELECTRICITY: {
    GRID_AVERAGE: 0.92,
    RENEWABLE: 0.0,
    COAL: 1.05,
    NATURAL_GAS: 0.45,
  },
  
  // Fuel (kg CO2 per liter)
  FUEL: {
    PETROL: 2.31,
    DIESEL: 2.68,
    LPG: 1.51,
    CNG: 1.93,
  },
  
  // Transportation (kg CO2 per km)
  TRANSPORT: {
    CAR_PETROL: 0.192,
    CAR_DIESEL: 0.171,
    TRUCK: 0.285,
    FLIGHT_SHORT: 0.255,
    FLIGHT_LONG: 0.195,
    TRAIN: 0.041,
  },
  
  // Waste (kg CO2 per kg)
  WASTE: {
    LANDFILL: 0.5,
    RECYCLED: 0.1,
    COMPOSTED: 0.05,
    INCINERATED: 0.7,
  },
  
  // Water (kg CO2 per cubic meter)
  WATER: 0.344,
  
  // Paper (kg CO2 per kg)
  PAPER: 1.8,
};

// Emission scopes
export const EMISSION_SCOPES = {
  SCOPE_1: {
    id: 'scope1',
    label: 'Scope 1: Direct Emissions',
    description: 'Direct GHG emissions from owned or controlled sources',
    color: '#ef4444',
    categories: ['fuel', 'naturalGas', 'refrigerants'],
  },
  SCOPE_2: {
    id: 'scope2',
    label: 'Scope 2: Indirect Emissions',
    description: 'Indirect GHG emissions from purchased electricity, heat, or steam',
    color: '#f59e0b',
    categories: ['electricity', 'heating', 'cooling'],
  },
  SCOPE_3: {
    id: 'scope3',
    label: 'Scope 3: Value Chain Emissions',
    description: 'Indirect emissions from value chain activities',
    color: '#3b82f6',
    categories: ['transportation', 'waste', 'water', 'businessTravel'],
  },
};

// Input categories
export const INPUT_CATEGORIES = {
  ELECTRICITY: {
    id: 'electricity',
    label: 'Electricity Usage',
    unit: 'kWh',
    icon: 'Zap',
    scope: 'scope2',
  },
  FUEL: {
    id: 'fuel',
    label: 'Fuel Consumption',
    unit: 'Liters',
    icon: 'Fuel',
    scope: 'scope1',
  },
  TRANSPORTATION: {
    id: 'transportation',
    label: 'Transportation',
    unit: 'km',
    icon: 'Truck',
    scope: 'scope3',
  },
  WASTE: {
    id: 'waste',
    label: 'Waste Generated',
    unit: 'kg',
    icon: 'Trash2',
    scope: 'scope3',
  },
  WATER: {
    id: 'water',
    label: 'Water Usage',
    unit: 'm³',
    icon: 'Droplet',
    scope: 'scope3',
  },
  PAPER: {
    id: 'paper',
    label: 'Paper Usage',
    unit: 'kg',
    icon: 'FileText',
    scope: 'scope3',
  },
};

// Industry benchmarks (average kg CO2 per month)
export const INDUSTRY_BENCHMARKS = {
  TECHNOLOGY: 15000,
  MANUFACTURING: 45000,
  RETAIL: 25000,
  HEALTHCARE: 30000,
  EDUCATION: 20000,
  HOSPITALITY: 28000,
  FINANCE: 18000,
  LOGISTICS: 50000,
  FOOD_BEVERAGE: 35000,
  OTHER: 25000,
};

// Green Points calculation
export const POINTS_CALCULATION = {
  // Base points for low emissions
  BASE_POINTS_PER_TON_SAVED: 100,
  
  // Improvement bonus (percentage improvement from previous month)
  IMPROVEMENT_MULTIPLIER: 50, // points per 1% improvement
  
  // Milestone bonuses
  MILESTONES: {
    BELOW_AVERAGE: 500, // Below industry average
    TOP_50_PERCENT: 1000,
    TOP_25_PERCENT: 2000,
    TOP_10_PERCENT: 5000,
  },
  
  // Activity bonuses
  ACTIVITIES: {
    FIRST_CALCULATION: 500,
    MONTHLY_STREAK: 100, // per month
    QUARTERLY_REPORT: 300,
  },
};

// Unit conversions
export const UNIT_CONVERSIONS = {
  TONS_TO_KG: 1000,
  KG_TO_TONS: 0.001,
  KWH_TO_MWH: 0.001,
  LITERS_TO_GALLONS: 0.264172,
  KM_TO_MILES: 0.621371,
};

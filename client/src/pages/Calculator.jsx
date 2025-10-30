import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Zap, Fuel, Trash2, Car, Check } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import { carbonService } from '@/lib/api/services';
import { formatNumber } from '@/lib/utils';
import toast from 'react-hot-toast';

const Calculator = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Scope 1: Direct emissions
    naturalGas: '',
    diesel: '',
    gasoline: '',
    
    // Scope 2: Indirect emissions (electricity)
    electricity: '',
    
    // Scope 3: Other indirect emissions
    businessTravel: '',
    employeeCommute: '',
    waste: '',
    water: '',
    
    // Period
    period: 'monthly',
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCalculate = async () => {
    try {
      setLoading(true);
      
      // Get current month in format "YYYY-MM"
      const currentDate = new Date();
      const calculationPeriod = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
      
      const calculationData = {
        // Fuel (Scope 1)
        fuelPetrol: parseFloat(formData.gasoline) || 0,
        fuelDiesel: parseFloat(formData.diesel) || 0,
        
        // Electricity (Scope 2)
        electricity: parseFloat(formData.electricity) || 0,
        
        // Transportation (Scope 3)
        transportCarPetrol: parseFloat(formData.businessTravel) || 0,
        transportCarDiesel: parseFloat(formData.employeeCommute) || 0,
        
        // Waste (Scope 3)
        wasteLandfill: parseFloat(formData.waste) || 0,
        wasteRecycled: 0,
        
        // Water (Scope 3)
        water: parseFloat(formData.water) || 0,
        
        // Paper (Scope 3)
        paper: 0,
        
        // Required field
        calculationPeriod: calculationPeriod,
      };

      const response = await carbonService.calculate(calculationData);
      setResult(response);
      setStep(4);
      toast.success('Calculation completed successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('Failed to calculate emissions');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Fuel className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-secondary-900 mb-2">Scope 1: Direct Emissions</h2>
        <p className="text-secondary-600">Enter your direct fuel consumption</p>
      </div>

      <Input
        label="Natural Gas (m³)"
        type="number"
        name="naturalGas"
        value={formData.naturalGas}
        onChange={handleChange}
        placeholder="e.g., 1000"
        helperText="Monthly natural gas consumption"
        fullWidth
      />

      <Input
        label="Diesel (liters)"
        type="number"
        name="diesel"
        value={formData.diesel}
        onChange={handleChange}
        placeholder="e.g., 500"
        helperText="Monthly diesel fuel consumption"
        fullWidth
      />

      <Input
        label="Gasoline (liters)"
        type="number"
        name="gasoline"
        value={formData.gasoline}
        onChange={handleChange}
        placeholder="e.g., 300"
        helperText="Monthly gasoline consumption"
        fullWidth
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Zap className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-secondary-900 mb-2">Scope 2: Electricity</h2>
        <p className="text-secondary-600">Enter your electricity consumption</p>
      </div>

      <Input
        label="Electricity (kWh)"
        type="number"
        name="electricity"
        value={formData.electricity}
        onChange={handleChange}
        placeholder="e.g., 5000"
        helperText="Monthly electricity consumption"
        fullWidth
      />

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900 font-medium mb-1">💡 Tip</p>
        <p className="text-sm text-blue-700">Check your electricity bill for kWh consumption. Average office uses 10-15 kWh per square meter per month.</p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Car className="w-8 h-8 text-accent-600" />
        </div>
        <h2 className="text-2xl font-bold text-secondary-900 mb-2">Scope 3: Other Emissions</h2>
        <p className="text-secondary-600">Enter indirect emissions data</p>
      </div>

      <Input
        label="Business Travel (km)"
        type="number"
        name="businessTravel"
        value={formData.businessTravel}
        onChange={handleChange}
        placeholder="e.g., 2000"
        helperText="Monthly business travel distance"
        fullWidth
      />

      <Input
        label="Employee Commute (km)"
        type="number"
        name="employeeCommute"
        value={formData.employeeCommute}
        onChange={handleChange}
        placeholder="e.g., 5000"
        helperText="Total employee commute distance per month"
        fullWidth
      />

      <Input
        label="Waste Generated (kg)"
        type="number"
        name="waste"
        value={formData.waste}
        onChange={handleChange}
        placeholder="e.g., 500"
        helperText="Monthly waste generated"
        fullWidth
      />

      <Input
        label="Water Consumption (m³)"
        type="number"
        name="water"
        value={formData.water}
        onChange={handleChange}
        placeholder="e.g., 100"
        helperText="Monthly water consumption"
        fullWidth
      />
    </div>
  );

  const renderStep4 = () => {
    if (!result) return null;

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">Calculation Complete!</h2>
          <p className="text-secondary-600">Here's your carbon footprint breakdown</p>
        </div>

        {/* Total Emissions */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white text-center">
          <p className="text-sm font-medium mb-2 opacity-90">Total Carbon Emissions</p>
          <p className="text-5xl font-bold mb-1">{formatNumber(result.totalEmissions)}</p>
          <p className="text-lg opacity-90">kg CO₂ equivalent</p>
        </div>

        {/* Breakdown by Scope */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-xs font-medium text-red-900 mb-2">Scope 1</p>
            <p className="text-2xl font-bold text-red-600">{formatNumber(result.scope1Emissions || 0)}</p>
            <p className="text-xs text-red-700 mt-1">Direct Emissions</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-xs font-medium text-blue-900 mb-2">Scope 2</p>
            <p className="text-2xl font-bold text-blue-600">{formatNumber(result.scope2Emissions || 0)}</p>
            <p className="text-xs text-blue-700 mt-1">Electricity</p>
          </div>
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 text-center">
            <p className="text-xs font-medium text-accent-900 mb-2">Scope 3</p>
            <p className="text-2xl font-bold text-accent-600">{formatNumber(result.scope3Emissions || 0)}</p>
            <p className="text-xs text-accent-700 mt-1">Other Indirect</p>
          </div>
        </div>

        {/* Green Points Info */}
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-900 mb-1">🎉 Calculation Recorded!</p>
              <p className="text-xs text-green-700">Green points have been awarded to your account</p>
            </div>
            <p className="text-2xl font-bold text-green-600">✓</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => {
              setStep(1);
              setResult(null);
              setFormData({
                naturalGas: '',
                diesel: '',
                gasoline: '',
                electricity: '',
                businessTravel: '',
                employeeCommute: '',
                waste: '',
                water: '',
                period: 'monthly',
              });
            }}
          >
            New Calculation
          </Button>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate('/dashboard')}
          >
            View Dashboard
          </Button>
        </div>
      </div>
    );
  };

  const steps = [
    { number: 1, title: 'Direct', icon: Fuel },
    { number: 2, title: 'Electricity', icon: Zap },
    { number: 3, title: 'Other', icon: Car },
    { number: 4, title: 'Results', icon: Check },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s, index) => {
              const Icon = s.icon;
              const isActive = step === s.number;
              const isCompleted = step > s.number;
              
              return (
                <div key={s.number} className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isActive ? 'bg-primary-600 text-white scale-110' :
                    isCompleted ? 'bg-green-500 text-white' :
                    'bg-secondary-200 text-secondary-500'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className={`text-xs mt-2 font-medium ${
                    isActive ? 'text-primary-600' :
                    isCompleted ? 'text-green-600' :
                    'text-secondary-500'
                  }`}>
                    {s.title}
                  </p>
                  {index < steps.length - 1 && (
                    <div className={`absolute h-0.5 top-6 transition-all ${
                      isCompleted ? 'bg-green-500' : 'bg-secondary-200'
                    }`} style={{ 
                      width: 'calc(100% / 4 - 3rem)',
                      left: `calc(${index * 25}% + 1.5rem + ${index * 25}%)`,
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl">
          <Card.Body className="p-6 sm:p-8">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}

            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleBack}
                    className="flex-1"
                  >
                    <ArrowLeft size={20} />
                    Back
                  </Button>
                )}
                {step < 3 && (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleNext}
                    className="flex-1"
                  >
                    Next
                    <ArrowRight size={20} />
                  </Button>
                )}
                {step === 3 && (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleCalculate}
                    loading={loading}
                    className="flex-1"
                  >
                    Calculate
                    <ArrowRight size={20} />
                  </Button>
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Calculator;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Building2, Globe, MapPin, Phone, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts';
import { Button, Input, Card } from '@/components/ui';
import { Logo } from '@/components/brand';
import { INDUSTRIES_ARRAY, COMPANY_SIZES } from '@/constants';
import { isValidEmail } from '@/lib/utils';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    address: '',
    phone: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.companyName) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }

    if (!formData.companySize) {
      newErrors.companySize = 'Company size is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4">
            <Logo size={48} />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-secondary-900">Create Account</h1>
          <p className="text-sm sm:text-base text-secondary-600 mt-2">
            Step {step} of 2: {step === 1 ? 'Account Details' : 'Company Information'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-5 sm:mb-6">
          <div className="flex gap-2">
            <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-primary-600' : 'bg-secondary-200'}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-primary-600' : 'bg-secondary-200'}`} />
          </div>
        </div>

        {/* Register Form */}
        <Card className="shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 && (
              <>
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  leftIcon={<Mail size={18} />}
                  fullWidth
                  autoFocus
                />

                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  leftIcon={<Lock size={18} />}
                  helperText="Minimum 8 characters"
                  fullWidth
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  leftIcon={<Lock size={18} />}
                  fullWidth
                />

                <Button
                  type="button"
                  onClick={handleNext}
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  Continue
                  <ArrowRight size={18} />
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <Input
                  label="Company Name"
                  type="text"
                  name="companyName"
                  placeholder="Your Company Ltd."
                  value={formData.companyName}
                  onChange={handleChange}
                  error={errors.companyName}
                  leftIcon={<Building2 size={18} />}
                  fullWidth
                  autoFocus
                />

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-secondary-900">
                    Industry
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select industry</option>
                    {INDUSTRIES_ARRAY.map((industry) => (
                      <option key={industry.value} value={industry.value}>
                        {industry.label}
                      </option>
                    ))}
                  </select>
                  {errors.industry && (
                    <p className="text-xs text-red-600">{errors.industry}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-secondary-900">
                    Company Size
                  </label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select company size</option>
                    {COMPANY_SIZES.map((size) => (
                      <option key={size.value} value={size.value}>
                        {size.label}
                      </option>
                    ))}
                  </select>
                  {errors.companySize && (
                    <p className="text-xs text-red-600">{errors.companySize}</p>
                  )}
                </div>

                <Input
                  label="Website (Optional)"
                  type="url"
                  name="website"
                  placeholder="https://yourcompany.com"
                  value={formData.website}
                  onChange={handleChange}
                  leftIcon={<Globe size={18} />}
                  fullWidth
                />

                <Input
                  label="Address (Optional)"
                  type="text"
                  name="address"
                  placeholder="City, Country"
                  value={formData.address}
                  onChange={handleChange}
                  leftIcon={<MapPin size={18} />}
                  fullWidth
                />

                <Input
                  label="Phone (Optional)"
                  type="tel"
                  name="phone"
                  placeholder="+1234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  leftIcon={<Phone size={18} />}
                  fullWidth
                />

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    <ArrowLeft size={18} />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    className="flex-1"
                  >
                    Create Account
                    {!loading && <ArrowRight size={18} />}
                  </Button>
                </div>
              </>
            )}
          </form>

          {/* Login Link */}
          {step === 1 && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-secondary-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-secondary-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              <Link to="/login">
                <Button variant="ghost" size="lg" fullWidth>
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Register;

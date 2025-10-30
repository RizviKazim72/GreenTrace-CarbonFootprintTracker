import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts';
import { Button, Input, Card } from '@/components/ui';
import { Logo } from '@/components/brand';
import { isValidEmail } from '@/lib/utils';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
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
          <h1 className="text-xl sm:text-2xl font-bold text-secondary-900">Welcome Back</h1>
          <p className="text-sm sm:text-base text-secondary-600 mt-2">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
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
              autoComplete="email"
              autoFocus
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              leftIcon={<Lock size={18} />}
              fullWidth
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              Sign In
              {!loading && <ArrowRight size={18} />}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-5 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-secondary-200"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-4 bg-white text-secondary-500">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <Link to="/register" className="block">
            <Button variant="outline" size="lg" fullWidth className="w-full">
              Create Account
            </Button>
          </Link>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 shadow-md" padding="sm">
          <p className="text-xs sm:text-sm text-center text-secondary-600">
            <span className="font-medium text-primary-600">Demo:</span> demo@company.com / demo123
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;

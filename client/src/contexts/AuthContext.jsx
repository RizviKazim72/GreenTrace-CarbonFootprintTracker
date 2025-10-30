import { createContext, useContext, useState, useEffect } from 'react';
import { authService, companyService } from '@/lib/api';
import { authStorage } from '@/lib/utils';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = authStorage.getToken();
      const savedUser = authStorage.getUser();

      if (token && savedUser) {
        setUser(savedUser);
        setIsAuthenticated(true);

        // Fetch company profile if user is COMPANY role
        if (savedUser.role === 'COMPANY') {
          const companyData = await companyService.getProfile();
          setCompany(companyData);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      
      authStorage.setToken(response.token);
      authStorage.setUser({
        id: response.userId,
        email: response.email,
        role: response.role,
        companyId: response.companyId,
        companyName: response.companyName,
      });

      setUser({
        id: response.userId,
        email: response.email,
        role: response.role,
        companyId: response.companyId,
        companyName: response.companyName,
      });

      setIsAuthenticated(true);

      // Fetch company profile
      if (response.role === 'COMPANY') {
        const companyData = await companyService.getProfile();
        setCompany(companyData);
      }

      toast.success('Welcome back!');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const register = async (data) => {
    try {
      const response = await authService.register(data);
      
      authStorage.setToken(response.token);
      authStorage.setUser({
        id: response.userId,
        email: response.email,
        role: response.role,
        companyId: response.companyId,
        companyName: response.companyName,
      });

      setUser({
        id: response.userId,
        email: response.email,
        role: response.role,
        companyId: response.companyId,
        companyName: response.companyName,
      });

      setIsAuthenticated(true);

      // Fetch company profile
      const companyData = await companyService.getProfile();
      setCompany(companyData);

      toast.success('Registration successful!');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    authStorage.clearAuth();
    setUser(null);
    setCompany(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const updateCompany = (updatedCompany) => {
    setCompany(updatedCompany);
  };

  const value = {
    user,
    company,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateCompany,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts';
import ProtectedRoute from './components/routes/ProtectedRoute';
import { AppLayout } from './components/layout';
import { Login, Register } from './pages/auth';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Calculator from './pages/Calculator';
import Leaderboard from './pages/Leaderboard';
import PointsHistory from './pages/PointsHistory';
import './styles/globals.css';  

// Placeholder for public leaderboard
const PublicLeaderboard = () => <div className="p-8"><h1 className="text-2xl font-bold">Public Leaderboard (Coming Soon)</h1></div>;

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/leaderboard/public" element={<PublicLeaderboard />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/calculator" element={<AppLayout><Calculator /></AppLayout>} />
            <Route path="/leaderboard" element={<AppLayout><Leaderboard /></AppLayout>} />
            <Route path="/points-history" element={<AppLayout><PointsHistory /></AppLayout>} />
          </Route>
        </Routes>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#1e293b',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              borderRadius: '0.75rem',
              padding: '1rem',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

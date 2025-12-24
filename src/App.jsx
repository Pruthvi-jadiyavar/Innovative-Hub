import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';

// Pages
import Home from './pages/Home';
import UserPage from './pages/UserPage';
import Dashboard from './pages/Dashboard';
import ReportPage from './pages/ReportPage';
import Login from './pages/Login';
import ChatPage from './pages/ChatPage';
import RecentEventsPage from './pages/RecentEventsPage';
import DangerZonesPage from './pages/DangerZonesPage';
import { useAuth } from './contexts/AuthContext'; // Import useAuth for PrivateRoute
import { Navigate } from 'react-router-dom'; // Import Navigate

const PrivateRoute = ({ children, requiredRole }) => {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><UserPage /></PrivateRoute>} />
            <Route path="/events" element={<PrivateRoute><RecentEventsPage /></PrivateRoute>} />
            <Route path="/zones" element={<PrivateRoute><DangerZonesPage /></PrivateRoute>} />
            <Route path="/report" element={<PrivateRoute><ReportPage /></PrivateRoute>} />
            <Route path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />

            {/* Dashboard - Authorized Only */}
            <Route path="/dashboard" element={
              <PrivateRoute requiredRole="authorized">
                <Dashboard />
              </PrivateRoute>
            } />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;

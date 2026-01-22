import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages (You will create these next)
import Login from './pages/Login';
import Signup from './pages/Signup';
import InternDashboard from './pages/InternDashboard';
import AdminDashboard from './pages/AdminDashboard';
import TaskDetails from './pages/TaskDetails';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';

function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/login" 
        element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
      />
      <Route 
        path="/signup" 
        element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />} 
      />

      {/* Protected Dashboard Route */}
      <Route 
        path="/dashboard" 
        element={
          isAuthenticated ? (
            user.role === 'admin' ? <AdminDashboard /> : <InternDashboard />
          ) : (
            <Navigate to="/login" />
          )
        } 
      />

      {/* Shared Protected Routes */}
      <Route 
        path="/tasks/:taskId" 
        element={isAuthenticated ? <TaskDetails /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/profile" 
        element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
      />

      {/* 404 Redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import LoanApplication from './pages/LoanApplication';
import LoanDashboard from './pages/LoanDashboard';
import LoanList from './pages/LoanList';
import LoanDetail from './pages/LoanDetail';
import LoanEdit from './pages/LoanEdit';
import LenderList from './pages/LenderList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

const AppLayout = () => {
  const location = useLocation();
  const hideNavbar = ['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoanApplication />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <LoanDashboard />
          </PrivateRoute>
        } />
        <Route path="/loans" element={
          <PrivateRoute>
            <LoanList />
          </PrivateRoute>
        } />
        <Route path="/loan-list/:id" element={
          <PrivateRoute>
            <LoanDetail />
          </PrivateRoute>
        } />
        <Route path="/loan-list/:id/edit" element={
          <PrivateRoute>
            <LoanEdit />
          </PrivateRoute>
        } />
        <Route path="/lenders" element={
          <PrivateRoute>
            <LenderList />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Partners from './pages/Partners';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './components/AdminLayout';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin routes with layout */}
        <Route path="/dashboard" element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        } />
        <Route path="/partners" element={
          <AdminLayout>
            <Partners />
          </AdminLayout>
        } />
        <Route path="/transactions" element={
          <AdminLayout>
            <Transactions />
          </AdminLayout>
        } />
        <Route path="/settings" element={
          <AdminLayout>
            <Settings />
          </AdminLayout>
        } />
      </Routes>
    </Router>
  );
};

export default App;

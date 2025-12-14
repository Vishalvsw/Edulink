import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import PortalLayout from './components/PortalLayout';
import Home from './pages/public/Home';
import Courses from './pages/public/Courses';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Login from './pages/public/Login';
import AgentSignup from './pages/public/AgentSignup';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminApplications from './pages/admin/AdminApplications';
import StudentDashboard from './pages/student/StudentDashboard';
import AgentDashboard from './pages/agent/AgentDashboard';
import ApplicationForm from './pages/student/ApplicationForm';
import { User } from './types';

// Placeholder components for routes not fully implemented in this demo to prevent 404s
const Placeholder = ({ title }: { title: string }) => (
  <div className="p-12 text-center text-slate-500">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p>This module is part of the full production build.</p>
  </div>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/agent-signup" element={<AgentSignup />} />
        </Route>

        {/* Protected Routes - Portal Layout */}
        <Route element={<PortalLayout user={user} logout={handleLogout} />}>
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/applications" element={<AdminApplications />} />
          <Route path="/admin/agents" element={<Placeholder title="Agent Management" />} />
          <Route path="/admin/finance" element={<Placeholder title="Finance & Fees" />} />
          <Route path="/admin/reports" element={<Placeholder title="Reports & Analytics" />} />
          <Route path="/admin/settings" element={<Placeholder title="Settings" />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/apply" element={<ApplicationForm />} />
          <Route path="/student/payments" element={<Placeholder title="Payment History" />} />

          {/* Agent Routes */}
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
          <Route path="/agent/leads" element={<Placeholder title="Lead Management" />} />
          <Route path="/agent/applications" element={<Placeholder title="Application Status" />} />
          <Route path="/agent/commissions" element={<Placeholder title="Commission History" />} />
        
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserType from "./pages/UserType";
import InterviewDate from "./pages/InterviewDate";
import Dashboard from "./pages/Dashboard";
import DsaPractice from "./pages/DsaPractice";
import SystemDesign from "./pages/SystemDesign";
import Dbms from "./pages/Dbms";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";

import "./App.css";

const RootRedirect = () => {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) return <div className="app-loader">Loading...</div>;

  // 🔥 If NOT logged in → Landing
  if (!user) return <Navigate to="/landing" />;

  // 🔥 If logged in but userType not selected
  if (user && !user.userType) return <Navigate to="/user-type" />;

  // 🔥 If logged in but interview date not selected
  if (user && !user.interviewDate) return <Navigate to="/interview-date" />;

  // 🔥 If logged in fully → Dashboard
  return <Navigate to="/dashboard" />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Public Pages */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Pages */}
          <Route path="/user-type" element={<ProtectedRoute><UserType /></ProtectedRoute>} />
          <Route path="/interview-date" element={<ProtectedRoute><InterviewDate /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dsa" element={<ProtectedRoute><DsaPractice /></ProtectedRoute>} />
          <Route path="/system-design" element={<ProtectedRoute><SystemDesign /></ProtectedRoute>} />
          <Route path="/dbms" element={<ProtectedRoute><Dbms /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Root Route */}
          <Route path="/" element={<RootRedirect />} />
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Markets from "../pages/Markets";
import Trade from "../pages/Trade";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Academy from "../pages/Academy";
import Help from "../pages/Help";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import MarketDetails from "../pages/MarketDetails";
import Profile from "../pages/Profile";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/help" element={<Help />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/markets/:symbol" element={<MarketDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}

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
import Team from "../pages/Team";
import Assets from "../pages/Assets";
import GuestRoute from "../layouts/GuestRoute";
import Wallet from "../pages/Wallet";
import History from "../pages/History";
import Admin from "../pages/Admin";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/help" element={<Help />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/team" element={<Team />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/markets/:symbol" element={<MarketDetails />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/history" element={<History />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>
    </Routes>
  );
}

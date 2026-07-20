import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home";
import Markets from "../pages/Markets";
import Trade from "../pages/Trade";
import Futures from "../pages/Futures";
import Assets from "../pages/Assets";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Academy from "../pages/Academy";
import Help from "../pages/Help";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/academy" element={<Academy />} />
      <Route path="/help" element={<Help />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/academy" element={<Academy />} />
        <Route path="/help" element={<Help />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/> 
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/futures" element={<Futures />} />
        <Route path="/assets" element={<Assets />} />
      </Route>
    </Routes>
  );
}

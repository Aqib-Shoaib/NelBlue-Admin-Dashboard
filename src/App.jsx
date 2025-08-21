import React from "react";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout/Layout";
import Users from "./pages/Users";
import Analaytics from "./pages/Analaytics";
import Projects from "./pages/Projects";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import AuthLayout from "./Layout/AuthLayout";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<Analaytics />} />
        <Route path="project" element={<Projects />} />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        <Route index path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="otp" element={<VerifyOtp />} />
      </Route>
    </Routes>

  );
}

export default App;

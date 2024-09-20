
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Permissions from "./Permissions";
import Roles from "./Roles";
import User from "./User";
import Dashboard from "./Dashboard";
import NavBarComponent from "./components/NavBarFolder/NavBarComponent";
import SideBarComponent from "./components/SideBarFolder/SideBarComponent";
import PrivateRoute from "./PrivateRoute";

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isAuthenticated = !!localStorage.getItem("userToken");
  const isAuthPage = location.pathname === "/" || location.pathname === "/signup";

  const getHeading = (path) => {
    switch (path) {
      case "/dashboard": return <h5>DASHBOARD</h5>;
      case "/home": return <h5>EVENT MANAGER</h5>;
      case "/roles": return <h5>ROLES</h5>;
      case "/permissions": return <h5>PERMISSIONS</h5>;
      case "/usertab": return <h5>USERS</h5>;
      default: return "";
    }
  };

  return (
    <div className="app">
      {isAuthenticated && !isAuthPage && (
        <>
          <NavBarComponent heading={getHeading(location.pathname)} />
          <SideBarComponent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </>
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes */}
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/permissions" element={<PrivateRoute element={Permissions} />} />
        <Route path="/roles" element={<PrivateRoute element={Roles} />} />
        <Route path="/usertab" element={<PrivateRoute element={User} />} />
        <Route path="/home/*" element={<PrivateRoute element={Home} />} />
        <Route path="*" element={<h5 style={{ textAlign: "center" }}>404 - Page Not Found</h5>} />
      </Routes>
    </div>
  );
}

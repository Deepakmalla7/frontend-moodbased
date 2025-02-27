import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; 
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Dynamic Content (Changes Based on Route) */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

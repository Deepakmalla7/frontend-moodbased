import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Dashboard.css";

const Navbar = () => {
  const navigate = useNavigate(); // To programmatically navigate after logout

  // Get roleId from localStorage
  const roleId = localStorage.getItem("roleID"); // roleId is stored as a string

  // Handle Logout
  const handleLogout = () => {
    // Remove items from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("photo");
    localStorage.removeItem("roleID"); // Also remove roleId

    // Redirect to login page after logout
    navigate("/login");
  };

  console.log("roleId", roleId);

  return (
    <aside className="sidebar">
      <h2 className="logo">
        <img src={logo} alt="MoodMuse Logo" className="logo-img" /> Mood Music
      </h2>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard/addsong">
              <i className="fas fa-music"></i> Add Songs
            </Link>
          </li>
          <li>
            <Link to="/dashboard/profile">
              <i className="fas fa-user"></i> Profile
            </Link>
          </li>

          {/* Show 'Users' only if roleId is 2 (Admin) */}
          {roleId == 2 && (
            <li>
              <Link to="/dashboard/users">
                <i className="fas fa-users"></i> Users
              </Link>
            </li>
          )}

          <li>
            <Link to="/dashboard/aboutus">
              <i className="fas fa-info-circle"></i> About us
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;

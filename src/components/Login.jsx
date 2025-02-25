import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../API/api"; // Import API function
import "./Login.css";

function Login() {
  const navigate = useNavigate(); // Navigation hook
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); // Error handling

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData); // Call API function
      alert("Login successful! Redirecting to dashboard...");
      
      console.log(response.data.user.id)
      // Store token in localStorage (optional)
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.data.user.id); // Store user ID in localStorage


      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <h2>संगीत</h2>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Log In</button>
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}


export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { createUser } from "../API/api";
function Signup() {
  const navigate = useNavigate(); // Use navigate for redirection

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
  
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
  
    try {
      // Call the createUser function directly with formData
      const response = await createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
  
      alert("Signup successful! Redirecting to login...");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Signup failed. Try again.");
    }
  };
  

  return (
    <div className="container">
      <div className="header">
        <h2>संगीत</h2>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
          autoComplete="new-password"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Signup;

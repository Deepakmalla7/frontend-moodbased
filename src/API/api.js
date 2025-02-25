import axios from "axios";


const API_BASE_URL = "http://localhost:5000"; // Update this with your backend URL

// Fetch all users
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// Create a new user
export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/signup`, userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

// Update user details
export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

// Delete a user
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

// Login user
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
        return response;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};




// Upload Song API
export const uploadSong = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/songs/songs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

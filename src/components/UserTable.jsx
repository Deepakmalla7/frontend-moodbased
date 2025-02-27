import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserTable.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/get_users");
      setUsers(response.data);
    } catch (error) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Button Click (Open Modal)
  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  // Handle Input Change in Edit Form
  const handleInputChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  // Handle Save Changes in Edit Modal
  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:5000/users/edit/${editingUser.id}`, editingUser);
      setShowEditModal(false);
      fetchUsers(); // Refresh user list after update
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle Delete Button Click
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/users/delete_user/${userId}`);
        fetchUsers(); // Refresh user list after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="user-table-container">
      <h2>User List</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && users.length === 0 && <p>No users found.</p>}
      {!loading && !error && users.length > 0 && (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
             
                <td>
                  <button className="edit-btn" onClick={() => handleEditClick(user)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit User</h3>
            <label>Name:</label>
            <input type="text" name="name" value={editingUser.name} onChange={handleInputChange} />

            <label>Email:</label>
            <input type="email" name="email" value={editingUser.email} onChange={handleInputChange} />

            <div className="modal-buttons">
              <button onClick={handleSaveChanges} className="save-btn">Save</button>
              <button onClick={() => setShowEditModal(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;

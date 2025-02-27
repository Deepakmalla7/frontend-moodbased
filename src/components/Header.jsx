import React from "react";
import { Search, User } from "lucide-react";
export const Header = () => {
  return (
    <div className="header">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Keywords"
          className="search-input"
        />
        <Search className="search-icon" size={20} />
      </div>
      <div className="user-profile">
        <div className="avatar">
          <User size={20} />
        </div>
        <span>Nabil</span>
      </div>
    </div>
  );
};

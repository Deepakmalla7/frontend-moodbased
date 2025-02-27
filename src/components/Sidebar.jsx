import React from "react";
import { Music, Home, Search, Library, Heart, Clock, Plus } from "lucide-react";
export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <h1 className="sidebar-title">Rihanna</h1>
      </div>
      <nav className="nav-section">
        <div>
          <div className="nav-item">
            <Search size={20} />
            <span>Discover</span>
          </div>
          <div className="nav-item">
            <Music size={20} />
            <span>Songs</span>
          </div>
          <div className="nav-item">
            <Library size={20} />
            <span>Top charts</span>
          </div>
          <div className="nav-item">
            <Home size={20} />
            <span>Artist</span>
          </div>
        </div>
        <div className="divider">
          <h2 className="section-title">Playlist</h2>
          <div>
            <div className="nav-item">
              <Heart size={20} />
              <span>Favourite</span>
            </div>
            <div className="nav-item">
              <Clock size={20} />
              <span>Recent</span>
            </div>
          </div>
        </div>
        <div className="divider">
          <h2 className="section-title">My music</h2>
          <div>
            <div className="nav-item">
              <span>High is hope</span>
              <Plus size={16} />
            </div>
            <div className="nav-item">
              <span>Shape of you</span>
              <Plus size={16} />
            </div>
            <div className="nav-item">
              <span>All we know</span>
              <Plus size={16} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

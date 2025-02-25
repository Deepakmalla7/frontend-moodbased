import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import logo from "../assets/logo.png";

// import profile from "../assets/user-avatar.png";

const Dashboard = () => {
  const [songs, setSongs] = useState([]);
  const [userName] = useState("Dipak"); // Replace with dynamic user data
  const [userMood, setUserMood] = useState("Happy"); // Replace with dynamic mood data
  // const [userMood, setUserMood] = useState("Ha

  const moods = ["Happy", "Sad", "Relaxed", "Energetic", "Romantic"];
  useEffect(() => {
    // Fetch all songs when the component mounts
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/songs");
        setSongs(response.data); // Set the songs state with the fetched songs
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="dashboard">
      {/* Sidebar */}
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
              <Link to="/addsong">
                <i className="fas fa-music"></i> Add Songs
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <i className="fas fa-user"></i> Profile
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <i className="fas fa-cog"></i> About us
              </Link>
            </li>
            <li>
              <Link to="/login">
                <i className="fas fa-sign-out-alt"></i> Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header>
          <h2>Welcome, {userName}</h2>
          <div className="user-info">
            <span>Current Mood: {userMood}</span>
            {/* Dynamically fetch or set user avatar */}
            <img src="user-avatar.png" alt="User Avatar" />
          </div>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Your Mood</h3>
            <select onChange={(e) => setUserMood(e.target.value)} value={userMood}>
          {moods.map((mood, index) => (
            <option key={index} value={mood}>
              {mood}
            </option>
          ))}
        </select>
          </div>
          <div className="card">
            <h3>Recommended Songs</h3>
            <p>Based on your mood: {userMood}</p>
          </div>
          <div className="card">
            <h3>Your Playlists</h3>
            <p>Your personalized playlists</p>
          </div>
        </section>


<div className = "songlist">
        {/* Displaying the list of uploaded songs */}
        <section className="song-list">
          <h3>Uploaded Songs</h3>
          <ul>
            {songs.length > 0 ? (
              songs.map((song) => (
                <li key={song.id} className="song-item">
                  <div className="song-info">
                    <h4>{song.title}</h4>
                    <p>{song.artist}</p>
                    <p>Album: {song.album}</p>
                    <p>Genre: {song.genre}</p>
                    <p>Mood: {song.mood}</p>
                  </div>
                  <audio controls>
                    <source src={`http://localhost:5000${song.filePath}`} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </li>
              ))
            ) : (
              <p>No songs available</p>
            )}
          </ul>
        </section>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;

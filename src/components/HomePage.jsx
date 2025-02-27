import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const HomePage = () => {
  const [songs, setSongs] = useState([]);
  const [userName, setUserName] = useState("");
  const [userMood, setUserMood] = useState("Happy"); // Default mood
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState(null); // User photo state

  const moods = ["Happy", "Sad", "Relaxed", "Energetic", "Romantic"]; // Mood types

  // Fetch user name and photo from localStorage
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedPhoto = localStorage.getItem("photo");

    if (storedUserName) {
      setUserName(storedUserName);
    }

    if (storedPhoto) {
      setPhoto(storedPhoto); // Set the photo if available
    }
  }, []);

  // Fetch songs from the backend
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/songs");
        setSongs(response.data);
      } catch (error) {
        setError("Error fetching songs. Please try again later.");
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  // Filter songs based on the mood in the "Uploaded Songs" section
  const filteredUploadedSongs = songs.filter(song => song.mood === userMood);



  // Function to generate avatar using the first letter of the user's name
  const generateAvatarUrl = (name) => {
    if (!name) return "https://ui-avatars.com/api/?name=User"; // Default to "User" if no name
    const avatarUrl = `https://ui-avatars.com/api/?name=${name}&background=4CAF50&color=fff&bold=true`;
    console.log("Generated Avatar URL:", avatarUrl); // Debugging line
    return avatarUrl;
  };
  
  console.log("photo", photo);

  return (
    <main className="Home-content">
      <header>
        <h2>Welcome, {userName}</h2>
        <div className="user-info">
          <span>Current Mood: {userMood}</span>
          {/* Show either the user photo or a letter-based avatar */}
          <img
  src={generateAvatarUrl(userName || "User")} // Ensure "User" is used as a fallback if userName is empty
  alt="User Avatar"
  className="user-avatar"
/>

=

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
          {/* Placeholder for mood-based recommendations */}
        </div>

        <div className="card">
          <h3>Your Playlists</h3>
          <p>Your personalized playlists</p>
          {/* Placeholder for user playlists */}
        </div>
      </section>

      {/* Loading and Error states */}
      {loading && <p>Loading songs...</p>}
      {error && <p>{error}</p>}

      {/* Song List Section */}
      <section className="song-list">
        <h3>Uploaded Songs</h3>
        <ul>
          {filteredUploadedSongs.length > 0 ? (
            filteredUploadedSongs.map((song) => (
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
            <p>No songs available for this mood.</p>
          )}
        </ul>
      </section>
    </main>
  );
};

export default HomePage;

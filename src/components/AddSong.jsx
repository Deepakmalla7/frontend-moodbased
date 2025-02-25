import React, { useState, useEffect } from "react";
import "./AddSong.css";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSong, setEditingSong] = useState(null);
  const [songData, setSongData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "", // default genre
    mood: " ", // default mood
    file: null
  });


  const genres = ["Pop", "Rock", "Hip-hop", "Jazz", "Classical", "Electronic", "Unknown Genre"];
  const moods = ["Happy", "Sad", "Energetic", "Relaxed", "Romantic", "Neutral"];
  // Fetch songs from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  // Handle song deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;

    try {
      await fetch(`http://localhost:5000/api/songs/${id}`, { method: "DELETE" });
      setSongs(songs.filter((song) => song.id !== id));
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  // Open modal for adding/editing a song
  const openModal = (song = null) => {
    setEditingSong(song);
    setSongData(
      song
        ? {
            title: song.title,
            artist: song.artist,
            album: song.album,
            genre: song.genre || "Unknown Genre",
            mood: song.mood || "Neutral",
            file: null
          }
        : { title: "", artist: "", album: "", genre: "Unknown Genre", mood: "Neutral", file: null }
    );
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setEditingSong(null);
  };

  // Handle input change
  const handleChange = (e) => {
    setSongData({ ...songData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setSongData({ ...songData, file: selectedFile });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", songData.title);
    formData.append("artist", songData.artist);
    formData.append("album", songData.album);
    formData.append("genre", songData.genre);
    formData.append("mood", songData.mood);
    
    // Use 'song' instead of 'filePath' for the backend to match with the backend code
    if (songData.file) formData.append("song", songData.file);
  
    console.log("Form Data being submitted:", {
      title: songData.title,
      artist: songData.artist,
      album: songData.album,
      genre: songData.genre,
      mood: songData.mood,
      song: songData.file,
    });
  
    try {
      const url = editingSong
        ? `http://localhost:5000/api/update-songs/${editingSong.id}`
        : "http://localhost:5000/api/add-song/";
      const method = editingSong ? "PUT" : "POST";
  
      const response = await fetch(url, { method, body: formData });
      const data = await response.json(); // Await the response
      console.log("Response from backend:", data);
  
      if (!response.ok) {
        throw new Error("Failed to submit song");
      }
  
      const updatedSongs = await fetch("http://localhost:5000/api/songs").then((res) =>
        res.json()
      );
      console.log("Updated songs:", updatedSongs);
      setSongs(updatedSongs);
      closeModal();
    } catch (error) {
      console.error("Error adding/updating song:", error);
    }
  };
  
  
  

  return (
    <div className="Song-container">
      <h3>Uploaded Songs</h3>
      <button onClick={() => openModal()} className="add-btn">Add Song</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Audio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {songs.length > 0 ? (
            songs.map((song) => (
              <tr key={song.id}>
                <td>{song.id}</td>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>
                  <audio controls>
                    <source src={`http://localhost:5000${song.filePath}`} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </td>
                <td>
                  <button onClick={() => openModal(song)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(song.id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No songs uploaded yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Overlay */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingSong ? "Edit Song" : "Add Song"}</h3>
            <form onSubmit={handleSubmit}>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={songData.title}
                onChange={handleChange}
                required
              />

              <label>Artist:</label>
              <input
                type="text"
                name="artist"
                value={songData.artist}
                onChange={handleChange}
                required
              />

              <label>Album:</label>
              <input
                type="text"
                name="album"
                value={songData.album}
                onChange={handleChange}
                required
              />
              <div>
              <label>Genre:</label>
              <select
                name="genre"
                value={songData.genre}
                onChange={handleChange}
                required
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              </div>
              
              <label>Mood:</label>
              <select
                name="mood"
                value={songData.mood}
                onChange={handleChange}
                required
              >
                {moods.map((mood) => (
                  <option key={mood} value={mood}>
                    {mood}
                  </option>
                ))}
              </select>

              <div>
                <label htmlFor="fileInput">Audio File:</label>
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                  accept="audio/*"
                />
              </div>

              <button type="submit">{editingSong ? "Update" : "Add"}</button>
              <button type="button" onClick={closeModal} className="cancel-btn">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongList;

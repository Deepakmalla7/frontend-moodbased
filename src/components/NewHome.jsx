import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { NowPlaying } from "./NowPlaying";
import "./NewHome.css";
export function New() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="content">
          <h1 className="hero-title">This Weekend</h1>
          <p className="hero-text">
            As I was walkin' down the road to Bethlehem one night
            <br />I looked up to the sky and there.
          </p>
          <button className="play-button">Play</button>
          <div className="releases-section">
            <h2 className="releases-title">New Releases</h2>
            <div className="releases-grid">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="release-card">
                  <img
                    src="https://mirrorful-production.s3.us-west-1.amazonaws.com/patterns/files/5d0d2a4b-1980-4885-853d-fe8cb192a527/18-compressed.jpg"
                    alt="Album cover"
                    className="release-image"
                  />
                  <h3 className="release-title">Rihanna</h3>
                  <p className="release-subtitle">singer</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <NowPlaying />
      </main>
    </div>
  );
}

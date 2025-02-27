import React from "react";
import {
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize2,
  Repeat,
} from "lucide-react";
export const NowPlaying = () => {
  return (
    <div className="now-playing">
      <div className="player-container">
        <div className="track-info">
          <img
            src="https://mirrorful-production.s3.us-west-1.amazonaws.com/patterns/files/5d0d2a4b-1980-4885-853d-fe8cb192a527/18-compressed.jpg"
            alt="Now playing"
            className="track-image"
          />
          <div className="track-details">
            <h3>All we know</h3>
            <p>Rhaima</p>
          </div>
        </div>
        <div className="player-controls">
          <div className="control-buttons">
            <SkipBack size={20} />
            <div className="play-control">
              <Play size={20} />
            </div>
            <SkipForward size={20} />
          </div>
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
        </div>
        <div className="volume-controls">
          <Volume2 size={20} />
          <div className="volume-bar">
            <div className="volume-level"></div>
          </div>
          <Repeat size={20} />
          <Maximize2 size={20} />
        </div>
      </div>
    </div>
  );
};

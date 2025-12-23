import React, { useState, useEffect } from 'react';
import './VideoScreen.css';

const VideoScreen = ({ onVideoEnd }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Handle video end event - immediately return to finale screen
  const handleVideoEnd = () => {
    onVideoEnd();
  };

  // Prevent seeking by hiding controls after a short time
  useEffect(() => {
    let controlsTimer;
    if (isPlaying && !showControls) {
      controlsTimer = setTimeout(() => {
        setShowControls(false);
      }, 3000); // Hide controls after 3 seconds
    }

    return () => {
      if (controlsTimer) clearTimeout(controlsTimer);
    };
  }, [isPlaying, showControls]);

  return (
    <div className="video-screen">
      <div className="video-container">
          <video
            className="video-player"
            controls
            autoPlay
            src="Video/7358446670684.mp4" // Using video from the Video folder with correct name
          controls={showControls}
          onEnded={handleVideoEnd}
          onPlay={() => {
            setIsPlaying(true);
            setShowControls(true);
          }}
          onDoubleClick={() => setShowControls(!showControls)} // Allow double click to toggle controls
          onClick={() => setShowControls(!showControls)} // Click to toggle controls
          autoPlay
          playsInline
          disablePictureInPicture
          webkit-playsinline="true"
          preload="metadata"
          onError={(e) => {
            console.error('Video error:', e.target.error);
            // Fallback to a different video or handle error
            // Try to load a fallback video if the main one fails
          }}
        >
          Your browser does not support the video tag.
        </video>
        {!showControls && (
          <div className="video-overlay">
            <p>Video đang phát... (Nhấn để điều khiển)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoScreen;
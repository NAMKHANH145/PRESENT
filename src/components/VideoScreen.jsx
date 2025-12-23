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
          src="Video/7358446670684.mp4"
          controls={showControls}
          autoPlay
          playsInline
          webkit-playsinline="true"
          disablePictureInPicture
          onEnded={handleVideoEnd}
          onPlay={() => {
            setIsPlaying(true);
            setShowControls(true);
          }}
          onClick={() => setShowControls(!showControls)}
          onError={(e) => {
            console.error('Video error:', e.target.error);
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
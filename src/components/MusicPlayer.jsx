import React, { useState, useRef, useEffect } from 'react';
import { getRandomMusicFile } from '../utils/imageUtils'; // Reusing the utility file for now
import './MusicPlayer.css';

const MusicPlayer = ({ isVideoPlaying = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(null);

  // Set the initial song when component mounts and ensure music plays
  // This loads a random music file from the /Music folder using the utility function
  useEffect(() => {
    setCurrentSong(getRandomMusicFile());

    // Try to play music immediately when component mounts
    const timer = setTimeout(() => {
      if (audioRef.current && currentSong) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(e => {
              console.log("Autoplay failed on mount, will play on user interaction:", e);
            });
        }
      }
    }, 300); // Small delay to ensure audio is loaded

    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // If the audio has ended, restart it from the beginning
        if (audioRef.current.currentTime === audioRef.current.duration) {
          audioRef.current.currentTime = 0;
        }

        // Try to play the audio - this may fail due to browser autoplay policies
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Autoplay started successfully
              setIsPlaying(true);
            })
            .catch(error => {
              // Autoplay was prevented - show user needs to interact
              console.log("Autoplay prevented:", error);
              // In a real scenario, you might want to show a message to the user
            });
        } else {
          setIsPlaying(true);
        }
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Function to play music after user interaction
  // This function is used to play music after the user has interacted with the page
  // This is necessary due to browser policies that prevent autoplay
  const playMusicAfterInteraction = () => {
    if (audioRef.current && currentSong) {
      audioRef.current.currentTime = 0; // Reset to beginning when playing again
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(e => console.log("Audio play error:", e));
      }
    }
  };

  // Auto-play music after component mounts and when song changes, with fallback to user interaction
  // This ensures music starts on page load and after song changes, with fallback for browsers that require user interaction
  useEffect(() => {
    // When the song changes (including initial load), try to play it
    if (currentSong && audioRef.current) {
      // Small delay to ensure audio element is ready
      const timer = setTimeout(() => {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(e => {
              // If autoplay fails due to browser policy, wait for user interaction
              console.log("Autoplay failed, waiting for user interaction:", e);
            });
        }
      }, 500); // Shorter delay to improve responsiveness

      return () => clearTimeout(timer);
    }
  }, [currentSong]);

  // Also add event listeners for first interaction as fallback
  useEffect(() => {
    const handleFirstInteraction = () => {
      playMusicAfterInteraction();
      // Remove the event listener after the first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    // Add event listeners for first interaction
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    // Clean up event listeners
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Handle music pause/resume based on video screen state
  useEffect(() => {
    if (audioRef.current) {
      if (isVideoPlaying) {
        // Pause the music when video screen is active (whether video is playing or paused)
        audioRef.current.pause();
        setIsPlaying(false); // Update the playing state to reflect that music is paused
      } else {
        // Resume the music when leaving video screen (if there's a current song)
        if (currentSong) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch(e => {
                console.log("Music resume after video screen failed:", e);
                // Music might not auto-play again due to browser policies
                // User interaction will be needed to resume
              });
          }
        }
      }
    }
  }, [isVideoPlaying, currentSong]);

  return (
    <div className="music-player">
      {currentSong && (
        <audio
          ref={audioRef}
          src={currentSong}
          volume={volume}
          loop={false} // We handle looping manually to ensure it works consistently
          onEnded={() => {
            // When the song ends, immediately start playing from the beginning
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              const playPromise = audioRef.current.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    setIsPlaying(true);
                  })
                  .catch(e => {
                    console.log("Replay after end failed:", e);
                    setIsPlaying(false);
                    // Fallback to user interaction if autoplay fails
                    // The event listeners will handle playing after first interaction
                  });
              }
            }
          }}
        />
      )}
      <button onClick={togglePlay}>
        {isPlaying ? '⏸️' : '🎵'}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider"
      />
      <span className="volume-value">{Math.round(volume * 100)}%</span>
    </div>
  );
};

export default MusicPlayer;
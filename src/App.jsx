import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import GateScreen from './components/GateScreen';
import TrickScreen from './components/TrickScreen';
import TimelineScreen from './components/TimelineScreen';
import FinaleScreen from './components/FinaleScreen';
import VideoScreen from './components/VideoScreen';
import CustomCursor from './components/CustomCursor';
import BackgroundEffects from './components/BackgroundEffects';
import MusicPlayer from './components/MusicPlayer';
import './styles/App.css';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('gate'); // loading, gate, trick, timeline, finale, video
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Check if user is already authenticated (for development)
  // For testing purposes, we'll always start at login screen on reload
  useEffect(() => {
    // Always start at login screen for testing, but check if user was previously authenticated
    const authStatus = localStorage.getItem('anniversary_auth');
    if (authStatus === 'true') {
      // If you want to remember the login state, uncomment the next line
      // setIsAuthenticated(true);
      // setCurrentScreen('trick');
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('anniversary_auth', 'true');
    setCurrentScreen('loading'); // Go to loading after login
  };

  const handleLoadingComplete = () => {
    setCurrentScreen('trick'); // Go to trick screen after loading
  };

  const handleTrickSuccess = () => {
    setCurrentScreen('timeline');
  };

  const handleTimelineComplete = () => {
    setCurrentScreen('finale');
  };

  const handleVideoEnd = () => {
    // After video ends, return to finale screen
    setCurrentScreen('finale');
  };

  return (
    <div className="app">
      <CustomCursor />
      <BackgroundEffects />
      {currentScreen === 'gate' && <GateScreen onLoginSuccess={handleLoginSuccess} />}
      {currentScreen === 'loading' && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {currentScreen === 'trick' && <TrickScreen onChoice={() => handleTrickSuccess()} />}
      {currentScreen === 'timeline' && <TimelineScreen onComplete={handleTimelineComplete} />}
      {currentScreen === 'finale' && <FinaleScreen onShowVideo={() => setCurrentScreen('video')} />}
      {currentScreen === 'video' && <VideoScreen onVideoEnd={handleVideoEnd} />}
      <MusicPlayer isVideoPlaying={currentScreen === 'video'} />
    </div>
  );
};

export default App;
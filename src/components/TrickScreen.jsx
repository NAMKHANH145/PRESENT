import React, { useState, useEffect, useRef } from 'react';
import './TrickScreen.css';
import confetti from 'canvas-confetti';

const TrickScreen = ({ onChoice }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 200, y: 150 }); // Start near the "Yes" button
  const [noButtonMoveCount, setNoButtonMoveCount] = useState(0);
  const [yesButtonScale, setYesButtonScale] = useState(1); // Initial scale for "Yes" button
  const [noButtonVisible, setNoButtonVisible] = useState(true); // Track visibility of "No" button
  const [showSadMessage, setShowSadMessage] = useState(false); // Show "Em không yêu anh à :(" message
  const containerRef = useRef(null);

  // Function to create heart confetti effect
  // This function creates a heart-shaped confetti explosion using canvas-confetti library
  // Called when the user clicks "Yes" after the "No" button disappears
  const createHeartConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#db7093', '#ffc0cb', '#ff6b6b'],
      shapes: ['heart'],
      gravity: 1.5
    });
  };

  // Function to handle "No" button click - make it disappear and grow "Yes" button
  // This implements the "Cửa ải trả lời" interaction where the "No" button disappears after click
  const moveNoButton = (e) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event propagation

    // Make the "No" button disappear immediately
    setNoButtonVisible(false);

    // Increase the scale of the "Yes" button significantly
    setYesButtonScale(1.8); // Make it much larger

    // Show the sad message
    setShowSadMessage(true);
  };

  // Function to handle the final "Yes" button click with confetti
  // This function is called when the "Yes" button is clicked
  // If the "No" button is no longer visible (meaning it has disappeared after jumping),
  // it triggers the confetti effect before proceeding to the next screen
  const handleYesClick = () => {
    // Trigger confetti effect when "Yes" button is clicked after "No" button disappears
    if (!noButtonVisible) {
      createHeartConfetti();
    }
    onChoice();
  };

  return (
    <div className="trick-screen" ref={containerRef}>
      <div className="trick-container">
        <h1>Bé có yêu Anh không?</h1>
        <p>Hãy chọn một trong hai đáp án dưới đây...</p>

        <div className="buttons-container">
          <button
            className="pink-button yes-button"
            onClick={handleYesClick}
            style={{
              transform: `scale(${yesButtonScale})`,
              transition: 'all 0.3s ease' // Smooth transition as requested
            }}
          >
            Có
          </button>

          {noButtonVisible && (
            <button
              className="pink-button no-button"
              onClick={moveNoButton} // Changed from onMouseEnter to onClick as per requirements
            >
              Không
            </button>
          )}
        </div>

        {showSadMessage && (
          <p className="sad-message">Đừng chạy nữa, chỉ được chọn Có thôi! ❤️</p>
        )}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-message">
            Đừng chạy nữa, chỉ được chọn Có thôi! ❤️
          </div>
        </div>
      )}
    </div>
  );
};

export default TrickScreen;
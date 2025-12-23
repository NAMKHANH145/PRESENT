import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'canvas-confetti';
import './FinaleScreen.css';

const FinaleScreen = ({ onShowVideo }) => {
  const [showGift, setShowGift] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = "Cảm ơn em đã đồng hành cùng anh trong 2 năm qua. Em là món quà quý giá nhất anh từng có. Anh yêu em nhiều!";
  const textRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypewriterText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // Confetti effect
  const triggerConfetti = () => {
    Confetti({
      particleCount: 1000,
      spread: 180,
      origin: { y: 0.6 },
      colors: ['#ffc0cb', '#ffb6c1', '#ff69b4', '#fffdd0', '#ff1744']
    });
  };

  // Trigger confetti when component mounts
  useEffect(() => {
    triggerConfetti();

    // Additional confetti bursts
    const confettiInterval = setInterval(() => {
      Confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ffc0cb', '#ffb6c1', '#ff69b4']
      });
    }, 1000);

    // Stop confetti after 10 seconds
    setTimeout(() => {
      clearInterval(confettiInterval);
    }, 10000);

    return () => clearInterval(confettiInterval);
  }, []);

  return (
    <div className="finale-screen">
      <div className="finale-container">
        <h1>Chúc mừng kỉ niệm 2 năm tình yêu của chúng ta!</h1>
        <div className="typewriter-container">
          <p ref={textRef}>{typewriterText}</p>
        </div>

        <div className="gift-section">
          <div className="arrow-indicator">
            <span className="arrow">↓</span>
            <p className="click-here-text">Nhấn vào đây</p>
          </div>
          <button
            className="pink-button gift-button"
            onClick={onShowVideo} // Trigger video screen
          >
            Món quà đặc biệt đang chờ em
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinaleScreen;
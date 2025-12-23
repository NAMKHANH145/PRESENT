import React, { useEffect, useState } from 'react';
import './BackgroundEffects.css';

const BackgroundEffects = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Create falling hearts
    const createHeart = () => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 5,
      };
      
      setHearts(prev => [...prev, newHeart]);
      
      // Remove heart after animation completes
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, (newHeart.duration + newHeart.delay) * 1000);
    };

    // Create initial hearts
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createHeart(), i * 300);
    }

    // Create new hearts periodically
    const interval = setInterval(createHeart, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="falling-hearts">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart-fall"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          ❤
        </div>
      ))}
    </div>
  );
};

export default BackgroundEffects;
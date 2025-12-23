import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Romantic messages that appear as the loading progresses
  const romanticMessages = [
    "Hãy chuẩn bị cho một món quà bất ngờ...",
    "Tình yêu như một bản nhạc giao hưởng...",
    "Hai năm bên em là điều anh luôn mong ước...",
    "Mỗi ngày bên em là một ngày hạnh phúc...",
    "Anh luôn yêu em nhiều hơn mỗi ngày...",
    "Cảm ơn em vì đã luôn ở bên anh...",
    "Em là người phụ nữ tuyệt vời nhất...",
    "Tình yêu của anh dành trọn cho em...",
    "Cùng nhau chúng ta sẽ viết tiếp câu chuyện tình...",
    "Chuẩn bị cho một bất ngờ đặc biệt..."
  ];

  useEffect(() => {
    // Simulate loading progress - 12 seconds total (slower than before)
    const totalDuration = 12000; // 12 seconds
    const intervalTime = 100; // Update every 100ms
    const increment = (100 * intervalTime) / totalDuration; // Calculate increment per interval

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 500); // Small delay before completing
          return 100;
        }
        return newProgress;
      });
    }, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, [onLoadingComplete]);

  // Change romantic messages every 2 seconds
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(prevIndex => (prevIndex + 1) % romanticMessages.length);
    }, 2000); // Change every 2 seconds

    return () => {
      clearInterval(messageInterval);
    };
  }, [romanticMessages.length]);

  return (
    <div className="loading-screen">
      {/* Loading Text */}
      <div className="loading-text">
        <p>{romanticMessages[currentMessageIndex]}</p>
      </div>
      <div className="loading-subtext">
        <p>Đang tải tình yêu của chúng ta... {Math.round(progress)}%</p>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, #ff69b4, #ffc0cb, #ffb6c1)` // Pink gradient
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
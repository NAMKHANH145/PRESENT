import React, { useState, useEffect } from 'react';
import './TimelineScreen.css';

const TimelineScreen = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLetter, setShowLetter] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  // Use specific images from the Picture folder with direct paths
  const timelineImages = [
    '/Picture/z7357248195324_5a5084f2357ffd290d062631a00ec6d3.jpg',
    '/Picture/z7357377222270_d86485c8e9e1122090877c03d70a18f8.jpg',
    '/Picture/z7357377387399_a049338a93cf6863fc80d79166e7ebe3.jpg',
    '/Picture/z7357377215059_38d92c865df55e659d6e0251a8182ec4.jpg'
  ];

  // Timeline data
  // This contains the events for the anniversary timeline
  // Each event includes a title, date, description, quote, and an image
  // The images are loaded from random paths in the /Picture folder
  const timelineEvents = [
    {
      title: "Lần đầu gặp nhau",
      date: "Một ngày tình cờ năm 2023",
      description: "Ngày đầu tiên anh thấy em cười, lòng anh đã thuộc về em",
      quote: "Tình yêu bắt đầu bằng một ánh mắt, một nụ cười, và một trái tim rung động",
      image: timelineImages[0] || "https://placehold.co/300x200/ffc0cb/ffffff?text=Lần+Đầu+Gặp"
    },
    {
      title: "Ngày mình yêu nhau",
      date: "24/12/2023",
      description: "Cà phê, trò chuyện, và cả thế giới như ngừng quay",
      quote: "Sau buổi hẹn ấy, anh đã biết em là người anh muốn nắm tay đi hết cuộc đời",
      image: timelineImages[1] || "https://placehold.co/300x200/ffb6c1/ffffff?text=Buổi+Hẹn+Đầu"
    },
    {
      title: "Kỉ niệm 1 năm",
      date: "24/12/2024",
      description: "Một năm yêu nhau, bao kỉ niệm đẹp như cổ tích",
      quote: "Một năm bên em là một năm anh hạnh phúc nhất đời",
      image: timelineImages[2] || "https://placehold.co/300x200/fffdd0/ff69b4?text=1+Tuổi+Tình+Yêu"
    },
    {
      title: "2 năm bên nhau",
      date: "24/12/2024",
      description: "Hai năm, 24 tháng, 730 ngày, 17520 giờ yêu em",
      quote: "Cảm ơn em vì đã là người anh yêu, người anh thương, người anh trân trọng",
      image: timelineImages[3] || "https://placehold.co/300x200/ffc0cb/ffffff?text=2+Tuổi+Tình+Yêu"
    }
  ];

  const handleNext = () => {
    if (currentIndex < timelineEvents.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Show the letter and then wait for user to click next button
      setShowLetter(true);
      setShowNextButton(true);
    }
  };

  const handleLetterNext = () => {
    onComplete();
  };

  return (
    <div className="timeline-screen">
      <div className="timeline-header">
        <h1>Hành Trình Tình Yêu</h1>
        <p>2 năm bên nhau - Có những kỉ niệm anh không thể nào quên</p>
      </div>

      <div className="timeline-container">
        <div className="timeline-event">
          <div className="event-image-container">
            <img 
              src={timelineEvents[currentIndex].image} 
              alt={timelineEvents[currentIndex].title}
              className="event-image"
            />
          </div>
          <div className="event-details">
            <h2>{timelineEvents[currentIndex].title}</h2>
            <p className="event-date">{timelineEvents[currentIndex].date}</p>
            <p className="event-description">{timelineEvents[currentIndex].description}</p>
            <p className="event-quote">"{timelineEvents[currentIndex].quote}"</p>
          </div>
        </div>

        <div className="timeline-navigation">
          <button className="pink-button next-button" onClick={handleNext}>
            {currentIndex < timelineEvents.length - 1 ? 'Tiếp theo' : 'Kết thúc hành trình'}
          </button>
        </div>

        <div className="timeline-progress">
          {timelineEvents.map((_, index) => (
            <div 
              key={index} 
              className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>

      {showLetter && (
        <div className="letter-overlay">
          <div className="letter-container">
            <h2>Gửi Huyền Thương - Người anh yêu</h2>
            <p>Em yêu,</p>
            <p>Hai năm qua là quãng thời gian đẹp nhất trong cuộc đời anh. Cảm ơn em vì đã luôn ở bên, chia sẻ mọi buồn vui, cùng anh đi qua bao thăng trầm.</p>
            <p>Mỗi ngày bên em là một ngày hạnh phúc. Anh mong rằng chúng ta sẽ còn bên nhau thật lâu, thật lâu nữa.</p>
            <p>Yêu em nhiều!</p>
            <p>Người luôn yêu em - Nam Khánh</p>
            {showNextButton && (
              <button className="pink-button next-button" onClick={handleLetterNext}>
                Tiếp theo
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineScreen;
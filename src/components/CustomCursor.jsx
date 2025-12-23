import React, { useEffect } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.classList.add('heart-cursor');
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
    };
  }, []);

  return null;
};

export default CustomCursor;
// LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css'; // Импортируем стили для анимации

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading">
      <div className="loading__spinner"></div>
      <span>Loading data...</span>
    </div>
  );
};

export default LoadingSpinner;

import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading">
      <svg className="loading__spinner" viewBox="0 0 50 50">
        <circle
          className="loading__spinner-path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;

import { CircleX } from 'lucide-react';
import React from 'react';

interface LoadingErrorProps {
  onReload: () => void;
}

const LoadingError: React.FC<LoadingErrorProps> = ({ onReload }) => {
  return (
    <div className="no-results">
      <p className="no-results__error">
        <CircleX />
        Error loading data
      </p>
      <button className="button button--reset" onClick={onReload}>
        Refresh
      </button>
    </div>
  );
};

export default LoadingError;

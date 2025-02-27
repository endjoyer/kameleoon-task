import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { useTestDetails } from '../hooks/useTestDetails';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { testId } = useParams<{ testId: string }>();
  const { test, site, loading, error } = useTestDetails(testId!);

  if (loading) return <LoadingSpinner />;
  if (error || !test || !site) {
    return (
      <div className="results">
        <button onClick={() => navigate('/')} className="back-button">
          <ChevronLeft />
          Back
        </button>
        <div className="error-message">Failed to load test results</div>
      </div>
    );
  }

  return (
    <div className="results">
      <button onClick={() => navigate('/')} className="back-button">
        <ChevronLeft />
        Back
      </button>
      <div className="results__header">
        <h1 className="results__title">Results</h1>
        <span className="results__text">{test.name}</span>
      </div>
      <div className="results__content">
        <div className="results__info">
          <div className="results__info-item">
            <span className="results__info-label">Type:</span>
            <span className="results__info-value">{test.type}</span>
          </div>
          <div className="results__info-item">
            <span className="results__info-label">Status:</span>
            <span className="results__info-value">{test.status}</span>
          </div>
          <div className="results__info-item">
            <span className="results__info-label">Site:</span>
            <span className="results__info-value">{site.url}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;

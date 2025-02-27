import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { useTestDetails } from '../hooks/useTestDetails';

const Finalize: React.FC = () => {
  const navigate = useNavigate();
  const { testId } = useParams<{ testId: string }>();
  const { test, site, loading, error } = useTestDetails(testId!);

  if (loading) return <LoadingSpinner />;
  if (error || !test || !site) {
    return (
      <div className="finalize">
        <button onClick={() => navigate('/')} className="back-button">
          <ChevronLeft />
          Back
        </button>
        <div className="error-message">Failed to load test details</div>
      </div>
    );
  }

  return (
    <div className="finalize">
      <button onClick={() => navigate('/')} className="back-button">
        <ChevronLeft />
        Back
      </button>
      <div className="finalize__header">
        <h1 className="finalize__title">Finalize</h1>
        <span className="finalize__text">{test.name}</span>
      </div>
      <div className="finalize__content">
        <div className="finalize__info">
          <div className="finalize__info-item">
            <span className="finalize__info-label">Type:</span>
            <span className="finalize__info-value">{test.type}</span>
          </div>
          <div className="finalize__info-item">
            <span className="finalize__info-label">Site:</span>
            <span className="finalize__info-value">{site.url}</span>
          </div>
        </div>
        <div className="finalize__actions">
          <button className="button button--primary">Launch Test</button>
        </div>
      </div>
    </div>
  );
};

export default Finalize;

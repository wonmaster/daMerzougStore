import React from 'react';

const ErrorDisplay = ({ message, retryFn }) => {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon">
          <i className="bi bi-exclamation-triangle"></i>
        </div>
        <h3>Connection Error</h3>
        <p>{message || 'Error fetching data. Please try again later.'}</p>
        {retryFn && (
          <button 
            className="retry-button" 
            onClick={retryFn}
          >
            <i className="bi bi-arrow-repeat me-2"></i>
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;

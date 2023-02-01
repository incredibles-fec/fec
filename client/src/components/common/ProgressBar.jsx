import React from 'react';

export default function ProgressBar({ action, progress }) {
  const percentage = `${progress}%`;
  return (
    <div className="progress-bar-container">
      <button className="button-trans" type="button">
        {`${action} stars`}
      </button>
      <div className="progress-bar">
        <div style={{ width: percentage }} className="progress-bar-fill" />
      </div>
    </div>
  );
}

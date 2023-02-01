import React from 'react';
import ReviewBar from '../common/ReviewBar.jsx';
import ProgressBar from '../common/ProgressBar.jsx';

export default function RatingsOverview() {
  return (
    <div className="overview-container">
      <ProgressBar value={50} />
      <ReviewBar />
    </div>
  );
}

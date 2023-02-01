import React from 'react';
import { useSelector } from 'react-redux';
import ReviewBar from '../common/ReviewBar.jsx';
import ProgressBar from '../common/ProgressBar.jsx';
import StarRatings from '../common/StarRatings.jsx';
import { getRatings } from '../../utils/helpers';

export default function RatingsOverview() {
  const { metaData } = useSelector((store) => store.rr);
  const productRating = Object.entries(metaData.ratings ?? {});
  const totals = getRatings(productRating);
  const recommendedTotal =
    metaData?.recommended?.true &&
    Math.round((metaData.recommended.true / totals.reviews) * 100);

  const renderProgressBars = () => (
    <div>
      {Object.entries(metaData?.ratings ?? {})
        .reverse()
        .map(([star, n]) => {
          const percentage = Math.round((Number(n) / totals.reviews) * 100);
          return <ProgressBar key={star} action={star} progress={percentage} />;
        })}
    </div>
  );

  return (
    <div className="overview-container">
      <div className="total-rating-container">
        <div className="total-rating">{totals.average || '-'}</div>
        <StarRatings rating={totals.average} />
      </div>

      <div>
        {recommendedTotal ? `${recommendedTotal}%` : '-'} of reviews recommend
        this product
      </div>
      {renderProgressBars()}
      <div style={{ marginTop: '1rem' }}>
        <ReviewBar />
      </div>
    </div>
  );
}

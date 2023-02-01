import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addStarFilter } from '../../state/rr';
import ReviewBar from '../common/ReviewBar.jsx';
import ProgressBar from '../common/ProgressBar.jsx';
import StarRatings from '../common/StarRatings.jsx';

export default function RatingsOverview({ metaData, totals }) {
  const { filters } = useSelector((store) => store.rr);
  const dispatch = useDispatch();
  const recommendedTotal =
    metaData?.recommended?.true &&
    Math.round((metaData.recommended.true / totals.reviews) * 100);

  const renderProgressBars = () => (
    <div>
      {Object.entries(metaData?.ratings ?? {})
        .reverse()
        .map(([star, n]) => {
          const percentage = Math.round((Number(n) / totals.reviews) * 100);
          return (
            <ProgressBar
              key={star}
              action={star}
              progress={percentage}
              filters={filters}
            />
          );
        })}
    </div>
  );

  return (
    <div>
      <div className="total-rating-container">
        <div className="total-rating">{totals.average.toFixed(2) || '-'}</div>
        <StarRatings rating={totals.average} />
      </div>

      <div>
        {recommendedTotal ? `${recommendedTotal}%` : '-'} of reviews recommend
        this product
      </div>
      {renderProgressBars()}
      {/* Once filter is clicked, message appears here with filters list */}
      {/* filters stack -> button to clear filter */}
      <div className="tags-container">
        {filters.map((tag) => (
          <div
            key={tag}
            className="selected-filter-tag"
            onClick={() => dispatch(addStarFilter(tag))}
          >
            {tag} ★
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1rem' }}>
        {Object.entries(metaData?.characteristics ?? {}).map(([key, char]) => (
          <ReviewBar key={key} title={key} characteristic={char} />
        ))}
      </div>
    </div>
  );
}

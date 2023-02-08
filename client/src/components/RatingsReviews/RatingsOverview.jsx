import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addStarFilter, filterReviews, clearFilters } from '../../state/rr';
import ReviewBar from '../common/ReviewBar.jsx';
import ProgressBar from '../common/ProgressBar.jsx';
import StarRatings from '../common/StarRatings.jsx';

export default function RatingsOverview() {
  const { metaData, filters, totals } = useSelector((store) => store.rr);

  const dispatch = useDispatch();
  const recommendedTotal =
    totals && Math.round((totals.recommend / totals.totalReviews) * 100);

  const filter = (star) => {
    dispatch(addStarFilter(star));
    dispatch(filterReviews());
  };

  const renderProgressBars = () => (
    <div>
      {Object.entries(totals?.ratings ?? {})
        .reverse()
        .map(([star, n]) => {
          const percentage = Math.round(
            (Number(n) / totals.totalReviews) * 100
          );
          return (
            <div style={{ margin: '0.3rem 0' }}>
              <ProgressBar
                key={star}
                action={star}
                progress={percentage}
                filters={filters}
              />
            </div>
          );
        })}
    </div>
  );

  const clear = () => {
    dispatch(clearFilters());
    dispatch(filterReviews());
  };

  return (
    <div>
      <div className="total-rating-container">
        <div className="total-rating">{totals?.average?.toFixed(2) ?? '-'}</div>
        <div style={{ paddingTop: '0.5rem' }}>
          <StarRatings rating={totals?.average} />
        </div>
      </div>

      <div>
        {recommendedTotal ? `${recommendedTotal}%` : '-'} of reviews recommend
        this product
      </div>
      {renderProgressBars()}
      <div className="tags-container">
        {filters.map((tag) => (
          <div
            key={tag}
            className="selected-filter-tag"
            onClick={() => filter(tag)}
          >
            {tag} ★
          </div>
        ))}
      </div>
      {filters.length > 0 && (
        <button className="button-trans" type="button" onClick={() => clear()}>
          Clear
        </button>
      )}
      <div style={{ marginTop: '1rem' }}>
        {Object.entries(metaData?.characteristics ?? {}).map(([key, char]) => (
          <ReviewBar key={key} title={key} characteristic={char} />
        ))}
      </div>
    </div>
  );
}

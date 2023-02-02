import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { transformDate } from '../../utils/helpers';
import { markHelpfulReview, reportReview } from '../../api/rr';
import StarRatings from '../common/StarRatings.jsx';

export default function RatingsTile({ review }) {
  const [isMarked, setIsMarked] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const { query } = useSelector((store) => store.rr);

  const actionHandler = async (type = 'mark') => {
    if (type === 'report') {
      if (isReported) return;
      await reportReview(review.review_id);
      setIsReported(true);
    } else {
      if (isMarked) return;
      await markHelpfulReview(review.review_id);
      setIsMarked(true);
    }
  };

  const searchHighlight = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, idx) => {
          const key = idx + 1;
          if (part.toLowerCase() === highlight.toLowerCase()) {
            return <b key={key}>{part}</b>;
          }
          return part;
        })}
      </span>
    );
  };

  // TODO: Slice first 250 chars of review body

  return (
    <div>
      <div className="tile-header">
        <div>
          <StarRatings rating={review.rating} />
        </div>
        <div style={{ display: 'flex', gap: '0.5em' }}>
          {/* {review.recommend && (
            <i className="fa-sharp fa-solid fa-circle-check" />
          )} */}
          {`${review.reviewer_name}, ${transformDate(review.date)}`}
        </div>
      </div>

      <div className="tile-body">
        <div>
          <b>{searchHighlight(review.summary, query)}</b>
        </div>
        <div>{searchHighlight(review.body, query)}</div>
      </div>

      <div className="a-photos">
        {review.photos.map((photo) => (
          <div key={photo.url} style={{ cursor: 'pointer' }}>
            <img alt="user uploaded" src={photo.url} />
          </div>
        ))}
      </div>

      <div className="tile-footer">
        <span>Helpful?</span>
        <button
          className="button-trans"
          type="button"
          disabled={isMarked}
          onClick={() => actionHandler()}
        >
          Yes
        </button>
        <span>
          ({isMarked ? review.helpfulness + 1 : review.helpfulness}) ┃
        </span>
        <button
          className="button-trans"
          type="button"
          disabled={isReported}
          onClick={() => actionHandler('report')}
        >
          {isReported ? 'Reported' : 'Report'}
        </button>
      </div>
      <hr />
    </div>
  );
}

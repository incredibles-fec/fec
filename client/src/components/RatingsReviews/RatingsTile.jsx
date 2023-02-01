import React, { useState } from 'react';
import { transformDate } from '../../utils/helpers';
import { markHelpfulReview, reportReview } from '../../api/rr';

export default function RatingsTile({ review }) {
  const [isMarked, setIsMarked] = useState(false);
  const [isReported, setIsReported] = useState(false);

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

  return (
    <div>
      <div className="tile-header">
        <div>Star rating goes here</div>
        <div style={{ display: 'flex', gap: '0.5em' }}>
          {/* {review.recommend && (
            <i className="fa-sharp fa-solid fa-circle-check" />
          )} */}
          {`${review.reviewer_name}, ${transformDate(review.date)}`}
        </div>
      </div>

      <div className="tile-body">
        <div>
          <b>{review.summary}</b>
        </div>
        <div>{review.body}</div>
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

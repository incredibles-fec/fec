import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { transformDate } from '../../utils/helpers';
import { markHelpfulReview, reportReview } from '../../api/rr';
import StarRatings from '../common/StarRatings.jsx';
import Modal from '../common/Modal.jsx';

export default function RatingsTile({ review }) {
  const [isMarked, setIsMarked] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [readMore, setReadMore] = useState(false);
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

  const openPhoto = (src) => {
    setCurrentPhoto(src);
    setIsOpen(true);
  };

  const setPreview = (text) => {
    if (text.length > 250) return `${text.slice(0, 247)}...`;
    return text;
  };
  const showButton = review.body.length > 250;

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
        <b>{searchHighlight(review.summary, query)}</b>
        {readMore ? (
          <div>{searchHighlight(review.body, query)}</div>
        ) : (
          <div>
            <div>{searchHighlight(setPreview(review.body), query)}</div>
            {showButton && (
              <button
                className="button-trans"
                type="button"
                onClick={() => setReadMore(true)}
              >
                Read more
              </button>
            )}
          </div>
        )}
        {review.recommend && (
          <div>
            <i className="fa-sharp fa-solid fa-circle-check" />
            <span style={{ marginLeft: '0.4rem' }}>
              I recommend this product
            </span>
          </div>
        )}
      </div>

      <div className="a-photos">
        {review.photos.map((photo) => (
          <div
            key={photo.url}
            style={{ cursor: 'pointer' }}
            onClick={() => openPhoto(photo.url)}
          >
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
      {isOpen && (
        <Modal close={() => setIsOpen(false)}>
          <div>
            <img
              className="photo-style"
              alt="user uploaded"
              src={currentPhoto}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

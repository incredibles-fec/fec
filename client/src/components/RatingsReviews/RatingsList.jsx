import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadMoreReviews, getReviews } from '../../state/rr';
import { debounce } from '../../utils/helpers';
import RatingsTile from './RatingsTile.jsx';
import Modal from '../common/Modal.jsx';
import AddReviewForm from './AddReviewForm.jsx';

export default function RatingsList() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollToLoad, setScrollToLoad] = useState(false);
  const { reviews, sort, count, metaData, totals, fullReviews } = useSelector(
    (store) => store.rr
  );

  const loadMore = () => {
    dispatch(loadMoreReviews());
    setScrollToLoad(true);
  };

  const ref = useRef();
  const onScrollLoad = useCallback((node) => {
    if (ref.current) ref.current.disconnect();
    ref.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const load = debounce(() => {
          dispatch(loadMoreReviews());
        }, 500);
        load();
      }
    });
    if (node) ref.current.observe(node);
  }, []);

  useEffect(() => {
    setScrollToLoad(false);
  }, [sort]);

  useEffect(() => {
    if (count > 30 && fullReviews.length < totals.reviews)
      dispatch(getReviews());
  }, [count]);

  return (
    <div>
      <section className="reviews-map">
        {reviews.map((review, idx) => (
          <div
            className="tile-container"
            key={review.review_id}
            ref={
              idx === reviews.length - 1 && scrollToLoad ? onScrollLoad : null
            }
          >
            <RatingsTile review={review} />
          </div>
        ))}
      </section>
      <section className="rating-list-footer">
        {!scrollToLoad && (
          <button type="button" onClick={() => loadMore()}>
            MORE REVIEWS
          </button>
        )}
        <button type="button" onClick={() => setIsOpen(true)}>
          ADD A REVIEW
        </button>
      </section>
      {isOpen && (
        <Modal close={() => setIsOpen(false)}>
          <AddReviewForm close={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

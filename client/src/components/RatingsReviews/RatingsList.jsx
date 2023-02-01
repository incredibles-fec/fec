import React, { useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadMoreReviews } from '../../state/rr';
import { debounce } from '../../utils/helpers';
import RatingsTile from './RatingsTile.jsx';
import Modal from '../common/Modal.jsx';
import AddReviewForm from './AddReviewForm.jsx';

export default function RatingsList() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollToLoad, setScrollToLoad] = useState(false);
  const { reviews } = useSelector((store) => store.rr);

  const loadMore = () => {
    dispatch(loadMoreReviews());
    setScrollToLoad(true);
  };

  const ref = useRef();
  const onScrollLoad = useCallback((node) => {
    if (ref.current) ref.current.disconnect();
    ref.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // TODO: Do fetch if again if not enough questions left
        const load = debounce(() => {
          dispatch(loadMoreReviews());
        });
        load();
      }
    });
    if (node) ref.current.observe(node);
  }, []);

  return (
    <div className="rating-list-container">
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

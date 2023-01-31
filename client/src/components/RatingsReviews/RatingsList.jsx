import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RatingsTile from './RatingsTile.jsx';
import Modal from '../common/Modal.jsx';
import AddReviewForm from './AddReviewForm.jsx';

export default function RatingsList() {
  const [isOpen, setIsOpen] = useState(false);
  const { reviews } = useSelector((store) => store.rr);

  return (
    <div className="rating-list-container">
      <section>
        {reviews.map((review) => (
          <div className="tile-container" key={review.review_id}>
            <RatingsTile review={review} />
          </div>
        ))}
      </section>

      <section className="rating-list-footer">
        <button type="button">MORE REVIEWS</button>
        <button type="button" onClick={() => setIsOpen(true)}>
          ADD A REVIEW
        </button>
      </section>

      {isOpen && (
        <Modal close={() => setIsOpen(false)}>
          <AddReviewForm />
        </Modal>
      )}
    </div>
  );
}

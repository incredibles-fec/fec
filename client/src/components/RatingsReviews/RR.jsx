import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, getMetaData } from '../../state/rr';
import RatingsList from './RatingsList.jsx';
import RatingsOverview from './RatingsOverview.jsx';
import SearchFilter from './SearchFilter.jsx';
import { getRatings } from '../../utils/helpers';

export default function RR() {
  const dispatch = useDispatch();
  const { metaData } = useSelector((store) => store.rr);
  const productRating = Object.entries(metaData.ratings ?? {});
  const totals = getRatings(productRating);

  useEffect(() => {
    Promise.all([dispatch(getReviews()), dispatch(getMetaData())]);
  }, []);

  return (
    <div className="rr-container">
      <section className="overview-container">
        <RatingsOverview metaData={metaData} totals={totals} />
      </section>
      <section className="rating-list-container">
        <div style={{ marginBottom: '1rem' }}>
          <SearchFilter totalReview={totals.reviews} />
        </div>
        <RatingsList />
      </section>
    </div>
  );
}

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getReviews, getMetaData } from '../../state/rr';
import RatingsList from './RatingsList.jsx';
import RatingsOverview from './RatingsOverview.jsx';
import SearchFilter from './SearchFilter.jsx';

export default function RR() {
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([dispatch(getReviews()), dispatch(getMetaData())]);
  }, []);

  return (
    <div className="rr-container parent" id="Ratings & Reviews">
      <section className="overview-container">
        <RatingsOverview />
      </section>
      <section className="rating-list-container">
        <div style={{ marginBottom: '1rem' }}>
          <SearchFilter />
        </div>
        <RatingsList />
      </section>
    </div>
  );
}

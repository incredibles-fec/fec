import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getReviews, getMetaData } from '../../state/rr';
import RatingsList from './RatingsList.jsx';
import RatingsOverview from './RatingsOverview.jsx';

export default function RR() {
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([dispatch(getReviews()), dispatch(getMetaData())]);
  }, []);

  return (
    <div className="rr-container">
      <RatingsOverview />
      <RatingsList />
    </div>
  );
}

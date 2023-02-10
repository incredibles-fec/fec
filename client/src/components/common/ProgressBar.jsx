import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addStarFilter, filterReviews } from '../../state/rr';

export default function ProgressBar({ action, progress, filters }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const addFilter = () => {
    dispatch(addStarFilter(action));
    setSelected(!selected);
    dispatch(filterReviews());
  };

  useEffect(() => {
    if (selected && !filters.includes(action)) setSelected(!selected);
  }, [filters]);

  const percentage = `${progress}%`;
  return (
    <div className="progress-bar-container">
      <button
        className={selected ? 'button-selected' : 'button-trans'}
        type="button"
        onClick={addFilter}
      >
        {`${action} stars`}
      </button>
      <div className="progress-bar">
        <div
          style={{ width: percentage }}
          className={
            selected ? 'progress-bar-fill-selected' : 'progress-bar-fill'
          }
        />
      </div>
    </div>
  );
}

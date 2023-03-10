import React, { useState } from 'react';

export default function RatingsSelector({ handleInput }) {
  const [rating, setRating] = useState(0);
  const select = (value) => {
    setRating(value);
    const res = { target: { name: 'rating', value } };
    handleInput(res);
  };

  return (
    <div className="r-star-buttons">
      {[1, 2, 3, 4, 5].map((value) => (
        <span key={value} className="star-button" onClick={() => select(value)}>
          <i
            className={`fa-solid fa-star ${
              rating < value ? 'deselected' : 'selected'
            }`}
          />
        </span>
      ))}
    </div>
  );
}

import React from 'react';

export default function StarRatings({ rating = 0 }) {
  const rounded = (Math.round(rating * 4) / 4).toFixed(2);
  const starMap = {
    '0.00': '0%',
    0.25: '7%',
    '0.50': '10%',
    0.75: '13%',
    '1.00': '20%',
    1.25: '27%',
    '1.50': '30%',
    1.75: '33%',
    '2.00': '40%',
    2.25: '47%',
    '2.50': '50%',
    2.75: '53%',
    '3.00': '60%',
    3.25: '67%',
    '3.50': '70%',
    3.75: '73%',
    '4.00': '80%',
    4.25: '87%',
    '4.50': '90%',
    4.75: '93%',
    '5.00': '100%',
  };

  return (
    <div className="star-rating">
      <div className="back-stars">
        <i className="fa-regular fa-star" />
        <i className="fa-regular fa-star" />
        <i className="fa-regular fa-star" />
        <i className="fa-regular fa-star" />
        <i className="fa-regular fa-star" />

        <div className="front-stars" style={{ width: starMap[rounded] }}>
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
        </div>
      </div>
    </div>
  );
}

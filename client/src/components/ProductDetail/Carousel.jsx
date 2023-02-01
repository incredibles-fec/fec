import React, { useState } from 'react';
// import styled from 'styled-components';

// const TestButton = styled.button`
//   width: 200px;
//   height: 50px;
//   background-color: ${(props) => props.backgroundColor};
// `;

export default function Carousel({ style }) {
  // const {style_id, name, original_price, sale_price, photos, skus} = style;
  const { name, photos } = style;
  const [index, setIndex] = useState(0);

  const images = photos.map((p, i) => (
    <div key={p.url} onClick={() => setIndex(i)}>
      <img className="carousel-item-thumbnail" src={p.thumbnail_url} alt={name} />
    </div>
  ));

  const getNext = () => {
    setIndex(index + 1 === photos.length ? index : index + 1);
  };

  const getPrev = () => {
    setIndex(index - 1 < 0 ? 0 : index - 1);
  };

  return (
    <div className="image-gallery-container">
      <div className="carousel-container">
        <img className="displayed-image" src={photos[index].url} alt={name} />
        <div className="carousel-actions">
          <button id="carousel-prev" aria-label="previous" type="button" onClick={getPrev}>&lt;</button>
          <button id="carousel-next" aria-label="next" type="button" onClick={getNext}>&gt;</button>
        </div>
      </div>
      <div className="carousel-thumbnail-container">
        <button id="carousel-thumbnail-prev" aria-label="previous" type="button" onClick={getPrev}>&and;</button>
        {images}
        <button id="carousel-thumbnail-next" aria-label="previous" type="button" onClick={getNext}>&or;</button>
      </div>
    </div>
  );
};

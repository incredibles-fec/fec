import React, { useState } from 'react';
import styled from 'styled-components';

// const TestButton = styled.button`
//   width: 200px;
//   height: 50px;
//   background-color: ${(props) => props.backgroundColor};
// `;

export default function Carousel({ style }) {
  const {style_id, name, original_price, sale_price, photos, skus} = style;
  const [index, setIndex] = useState(0);

  const getNext = () => {
    setIndex(index + 1 === index.length ? index : index + 1);
  };

  const getPrev = () => {
    setIndex(index - 1 < 0 ? 0 : index - 1);
  };

  return (
    <div className="carousel-container">
      <img className="displayed-image" src={photos[0].url} alt={name} />
      <div className="carousel-item">Carousel Item 1</div>
      <div className="carousel-item">Carousel Item 2</div>
    </div>
  );
}

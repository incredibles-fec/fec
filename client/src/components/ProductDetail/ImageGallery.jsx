import React from 'react';
import Carousel from './Carousel.jsx';
// import styled from 'styled-components';

// const TestButton = styled.button`
//   width: 200px;
//   height: 50px;
//   background-color: ${(props) => props.backgroundColor};
// `;

export default function ImageGallery({ styles }) {
  return (
    <div>
      <Carousel style={styles[0]} />
    </div>
  );
}

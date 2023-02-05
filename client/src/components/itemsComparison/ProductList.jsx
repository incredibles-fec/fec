import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Product from './Product.jsx';

export default function ProductList({ currentProduct, relatedList }) {
  const [previousVisble, setPreviousVisble] = React.useState(false);
  const [nextVisible, setnextVisible] = React.useState(true);
  const [firstSlide, setFirstSlide] = React.useState(0);
  const [lastSlide, setLastSlide] = React.useState(3);

  const onNext = () => {
    if (firstSlide >= 0) {
      setPreviousVisble(true);
    }
    if (lastSlide >= relatedList.length - 2) {
      setnextVisible(false);
    }
    const cardToView = document.getElementById(lastSlide);
    cardToView.scrollIntoView();
    setFirstSlide(firstSlide + 1);
    setLastSlide(lastSlide + 1);
  };

  const onBack = () => {
    if (firstSlide === 0) {
      setPreviousVisble(false);
    } else if (lastSlide >= relatedList.length - 2) {
      setnextVisible(true);
    }
    const cardToView = document.getElementById(firstSlide);
    cardToView.scrollIntoView();
    setFirstSlide(firstSlide - 1);
    setLastSlide(lastSlide - 1);
  };

  let num = 0;

  return (
    <div>
      <h3>Related Products</h3>
      <div className="relatedProductsCarousel">
        <div className="relatedProductContainer">
          {relatedList.map((item, index) => {
            if (item.id !== currentProduct.id) {
              return (<Product key={index} item={item} count={num++} />);
            }
          })}
        </div>
        <div className="carouselActions">
          { previousVisble ?
            <button type="button" className="previousProduct" onClick={onBack}>&lt;</button> : null }
          { nextVisible ?
            <button type="button" className="nextProduct" onClick={onNext}>&gt;</button> : null}
        </div>
      </div>
    </div>
  );
}

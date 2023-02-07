import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Product from './Product.jsx';
import { changeCurrentProductById } from '../../state/pd.js';

export default function ProductList({ currentProduct, relatedList }) {
  const [previousVisble, setPreviousVisble] = React.useState(false);
  const [nextVisible, setnextVisible] = React.useState(true);
  const [firstSlide, setFirstSlide] = React.useState(0);
  const [lastSlide, setLastSlide] = React.useState(3);

  const dispatch = useDispatch();

  const onNext = () => {
    if (firstSlide >= 0) {
      setPreviousVisble(true);
    }
    if (lastSlide >= relatedList.length - 2) {
      setnextVisible(false);
    }
    const cardToView = document.getElementById(lastSlide);
    cardToView.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
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
    cardToView.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    setFirstSlide(firstSlide - 1);
    setLastSlide(lastSlide - 1);
  };

  const onUpdate = (e, item) => {
    if (
      e.target.className !== 'fas fa-star' &&
      e.target.className !== 'modalExit'
    ) {
      dispatch(changeCurrentProductById(item));
    }
  };

  let num = 0;

  return (
    <div className="relatedProductsContainer">
      <h3>Related Products</h3>
      <div className="relatedItemContainer">
        <div className="outfitBack">
          {previousVisble ? (
            <button type="button" className="previousOutfit" onClick={onBack}>
              &lt;
            </button>
          ) : null}
        </div>
        <div className="relatedList">
          {relatedList.map((item, index) => {
            if (item.id !== currentProduct.id) {
              return (
                <Product
                  key={index}
                  item={item}
                  count={num++}
                  onUpdate={onUpdate}
                  currentProduct={currentProduct}
                />
              );
            }
          })}
        </div>
        <div className="outfitForward" onClick={onNext}>
          {nextVisible ? (
            <button type="button" className="nextOutfit">
              &gt;
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useDispatch } from 'react-redux';
import { getReviews, getMetaData } from '../../state/rr.js';
import { getQA } from '../../state/qa.js';
import Product from './Product.jsx';
import ProductModal from './ProductModal.jsx';
import { changeCurrentProductById } from '../../state/pd.js';

export default function ProductList({ currentProduct, relatedList }) {
  const [previousVisble, setPreviousVisble] = React.useState(false);
  const [nextVisible, setnextVisible] = React.useState(true);
  const [firstSlide, setFirstSlide] = React.useState(0);
  const [lastSlide, setLastSlide] = React.useState(3);
  const [visibleStatus, setvisibleStatus] = React.useState(false);
  const [comp, setComp] = React.useState(1);

  const dispatch = useDispatch();

  const onNext = () => {
    if (firstSlide >= 0) {
      setPreviousVisble(true);
    }
    if (lastSlide >= relatedList.length - 2) {
      setnextVisible(false);
    }
    const cardToView = document.getElementById(lastSlide);
    cardToView.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
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
    cardToView.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
    setFirstSlide(firstSlide - 1);
    setLastSlide(lastSlide - 1);
  };

  const onUpdate = (e, item) => {
    if (
      e.target.className !== 'fas fa-star' &&
      e.target.className !== 'modalExit'
    ) {
      dispatch(changeCurrentProductById(item));

      Promise.all([
        dispatch(getQA()),
        dispatch(getReviews()),
        dispatch(getMetaData()),
      ]);
    }
  };

  let num = 0;

  const changeModal = (e, item) => {
    e.preventDefault();
    setComp(item);
    setvisibleStatus(!visibleStatus);
  };

  return (
    <div className="relatedProductsContainer">
      <h3>Related Products</h3>
      <div className="relatedItemContainer">
        <ProductModal
          visible={visibleStatus}
          onClick={changeModal}
          currentProduct={currentProduct}
          item={comp}
        />
        <div className="outfitBack">
          {previousVisble ? (
            <button type="button" className="fa-regular fa-circle-left previousOutfit" aria-label="back" onClick={onBack} label="back" />
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
                  changeModal={changeModal}
                  currentProduct={currentProduct}
                  visibleStatus={visibleStatus}
                />
              );
            }
          })}
        </div>
        <div className="outfitForward" onClick={onNext}>
          {nextVisible ? (
            <button type="button" className="fa-regular fa-circle-right nextOutfit" label="next" aria-label="next" />
          ) : null}
        </div>
      </div>
    </div>
  );
}

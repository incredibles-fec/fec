import React from 'react';
import { useSelector } from 'react-redux';

export default function ProductDescription() {
  const { currentProduct } = useSelector((state) => state.pd);
  // eslint-disable-next-line max-len
  const feats = currentProduct.features.map((feat) => <li key={feat.feature + feat.value}>{feat.feature}: {feat.value}</li>);
  return (
    <div className="product-overview-container">
      <div className="product-slogan-description">
        <h4><b>{currentProduct.slogan}</b></h4>
        <p>{currentProduct.description}</p>
      </div>
      <div className="product-features">
        <ul>{feats}</ul>
      </div>
    </div>
  );
}

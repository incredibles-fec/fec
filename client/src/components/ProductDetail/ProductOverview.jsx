import React from 'react';

export default function ProductOverview({ product }) {
  // eslint-disable-next-line max-len
  const feats = product.features.map((feat) => <li key={feat.feature + feat.value}>{feat.feature}: {feat.value}</li>);
  return (
    <div className="product-overview-container">
      <div className="product-slogan-description">
        <h4><b>{product.slogan}</b></h4>
        <p>{product.description}</p>
      </div>
      <div className="product-features">
        <ul>{feats}</ul>
      </div>
    </div>
  );
}

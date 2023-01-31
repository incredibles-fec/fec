import React, { useState } from 'react';

export default function ProductFeatures({ product }) {
  // eslint-disable-next-line max-len
  const feats = product.features.map((feat) => <li key={feat.feature + feat.value}>{feat.feature}: {feat.value}</li>);
  return (
    <div>
      <ul className="product-description">Features List: {feats}</ul>
    </div>
  );
}

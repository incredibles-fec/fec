import React, { useState } from 'react';

export default function ProductOverview({ product }) {
  const features = product.features.map((feat) => <li>{feat.feature}</li>);

  return (
    <div>
      <h4 className="product-slogan"><b>Product Slogan{product.slogan}</b></h4>
      <ul className="product-description">Features List{features}</ul>
    </div>
  );
}

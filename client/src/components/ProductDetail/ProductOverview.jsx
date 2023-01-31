// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

export default function ProductOverview({ product }) {
  return (
    <div>
      <h4 className="product-slogan"><b>Product Slogan: {product.slogan}</b></h4>
      <ul className="product-description">Description: {product.description}</ul>
    </div>
  );
}

import React, { useState } from 'react';
import AddToBag from './AddToBag.jsx';

export default function ProductInformation({ product }) {
  return (
    <div>
      <div className="star-rating">Star Rating: &#9733; &#9734; &#9733; &#9734; &#9733;</div>
      <div className="product-category">Category: {product.category}</div>
      <div className="product-name"><h3>{product.name}</h3></div>
      <div className="product-price">${product.default_price}</div>
      <div className="product=style">Style &gt; Selected Style </div>
      <div className="add-to-bag"><AddToBag /></div>
    </div>
  );
}

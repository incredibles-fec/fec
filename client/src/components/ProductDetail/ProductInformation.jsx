import React, { useState } from 'react';

export default function ProductInformation({ product }) {
  return (
    <div>
      <div className="star-rating">Star Rating</div>
      <div className="product-category">Product Category: {product.category}</div>
      <div className="product-name">Product Name: {product.name}</div>
      <div className="product-price">Product Price: {product.default_price}</div>
      <div className="product=style">Product Style Selector</div>
      <div className="add-to-bag">Select Size and Quantity, then Add to Bag</div>
    </div>
  );
}

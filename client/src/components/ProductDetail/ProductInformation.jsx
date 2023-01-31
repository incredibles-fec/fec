import React, { useState } from 'react';
import AddToBag from './AddToBag.jsx';
import ShareSocialMedia from './ShareSocialMedia.jsx';
import Styles from './Styles.jsx';

export default function ProductInformation({ product, styles }) {
  return (
    <div>
      <div className="star-rating">Star Rating: &#9733; &#9734; &#9733; &#9734; &#9733;</div>
      <div className="product-category">Category: {product.category}</div>
      <div className="product-name"><h3>{product.name}</h3></div>
      <div className="product-price">${product.default_price}</div>
      <div className="product=style"><Styles styles={styles} /></div>
      <div className="add-to-bag"><AddToBag /></div>
      <div className="share-to-social-media"><ShareSocialMedia /></div>
    </div>
  );
}

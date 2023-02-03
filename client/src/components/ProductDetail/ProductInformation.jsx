import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ImageGallery from './ImageGallery.jsx';
import StarRatings from '../common/StarRatings.jsx';
import Styles from './Styles.jsx';
import AddToCart from './AddToCart.jsx';
import ShareSocialMedia from './ShareSocialMedia.jsx';

export default function ProductInformation() {
  const { currentProduct, currentProductStyles } = useSelector((state) => state.pd);
  const { totals } = useSelector((store) => store.rr);

  const product = currentProduct;
  const styles = currentProductStyles;

  const [currentStyle, setCurrentStyle] = useState(styles.filter((s) => s['default?'])[0]);

  return (
    <div className="gallery-and-styles-container">
      <ImageGallery style={currentStyle} />
      <div className="product-info-container">
        <StarRatings rating={totals?.average} /><span>Read all reviews</span>
        <div className="product-category"><h4>Category: {product.category}</h4></div>
        <div className="product-name"><h3>{product.name}</h3></div>
        <div className="product-price">
          {
            currentStyle.sale_price
              ? <p><s>${currentStyle.original_price}</s> <span className="sale-price">${currentStyle.sale_price}</span></p>
              : <p>${currentStyle.original_price}</p>
          }
        </div>
        <div className="product-styles-container"><Styles currentStyle={currentStyle} setCurrentStyle={setCurrentStyle} /></div>
        <div className="add-to-bag"><AddToCart style={currentStyle} /></div>
        <div className="share-to-social-media"><ShareSocialMedia /></div>
      </div>
    </div>
  );
}

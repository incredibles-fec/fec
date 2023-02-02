import React, { useState, useEffect } from 'react';
import ProductInformation from './ProductInformation.jsx';
import ProductOverview from './ProductOverview.jsx';
import ProductFeatures from './ProductFeatures.jsx';
import ImageGallery from './ImageGallery.jsx';

const axios = require('axios');

export default function ProductDetail() {
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([]);
  const [target, setTarget] = useState(null);
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    axios.get('/products')
      .then((prodsResp) => {
        setProducts(prodsResp.data);
        const { id } = prodsResp.data[0];
        axios.get(`/products/${id}`)
          .then((targetResp) => {
            setTarget(targetResp.data);
            axios.get(`/products/${id}/styles`)
              .then((targetStyles) => {
                setStyles(targetStyles.data.results);
              });
          });
      })
      .catch((err) => console.log(err));
  }, []);

  if (styles.length) {
    return (
      <div className="pd-flex-container">
        <h1 className="nav-bar">Navigation Bar with Logo</h1>
        <h4 className="site-wide-announcement">SITE-WIDE ANNOUNCEMENT MESSAGE! - <b>NO REFUNDS!!!</b></h4>
        <div className="product-info-container">
          <div className="image-gallery">
            <ImageGallery styles={styles} />
          </div>
          <div className="product-info-and-styles">
            Product Info & Styles: <ProductInformation product={target} styles={styles} />
          </div>
        </div>
        <div className="product-overview-container">
          <div className="product-slogan-description">
            <ProductOverview product={target} />
          </div>
          <div className="product-features">
            <ProductFeatures product={target} />
          </div>
        </div>
        ================================================
      </div>
    );
  }
  return (
    <div>
      <h1>LOADING... </h1>
    </div>
  );
}

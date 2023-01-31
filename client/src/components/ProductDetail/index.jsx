import React, { useState, useEffect } from 'react';
import ProductInformation from './ProductInformation.jsx';
import ProductOverview from './ProductOverview.jsx';
import ProductFeatures from './ProductFeatures.jsx';

const axios = require('axios');

export default function ProductDetail() {
  const [products, setProducts] = useState([]);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    axios.get('/products')
      .then((res) => {
        setProducts(res.data);
        axios.get(`/products/${res.data[0].id}`)
          .then((resp) => {
            setTarget(resp.data);
          });
      })
      .catch((err) => console.log(err));
  }, []);

  if (target) {
    return (
      <div className="flex-container">
        <h1 className="nav-bar">Navigation Bar with Logo</h1>
        <h4 className="site-wide-announcement">SITE-WIDE ANNOUNCEMENT MESSAGE! - <b>NO REFUNDS!!!</b></h4>
        <div className="product-info-container">
          <div className="image-gallery">
            Image Gallery Here
          </div>
          <div className="product-info-and-styles">
            Product Info & Styles: <ProductInformation product={target} />
          </div>
        </div>
        <div className="product-overview-container">
          <div className="product-slogan-description">
            Product Slogan & Description: <ProductOverview product={target} />
          </div>
          <div className="product-features">
            Product Features: <ProductFeatures product={target} />
          </div>
        </div>
        ================================================
      </div>
    );
  } else {
    return (
      <div>
        <h1>LOADING... </h1>
      </div>
    );
  }
}

import React from 'react';

export default function ProductDetail() {
  return (
    <div className="flex-container">
      <h1 className="nav-bar">Navigation Bar with Logo</h1>
      <h4 className="site-wide-announcement">SITE-WIDE ANNOUNCEMENT MESSAGE! - <b>NO REFUNDS!!!</b></h4>
      <div className="product-info-container">
        <div className="image-gallery">
          Image Gallery Here
        </div>
        <div className="product-info-and-styles">
          Product Info & Styles Here
        </div>
      </div>
      <div className="product-overview-container">
        <div className="product-slogan-description">
          Product Slogan & Description
        </div>
        <div className="product-features">
          Product Features
        </div>
      </div>
      ================================================
    </div>
  );
}

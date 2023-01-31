import React, { useState } from 'react';

export default function ProductFeatures({ product }) {
  console.log('product inside PF: ', product);
  console.log('product features', product.features);

  return (
    <div>
      <ul className="product-description">Features List</ul>
    </div>
  );
}

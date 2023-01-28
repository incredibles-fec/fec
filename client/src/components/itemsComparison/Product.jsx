import React from 'react';

const Product = ({item}) => {
  return (
    <div className='productCard'>
        <p>IMAGE PLACEHOLDER</p>
        <p>PRODUCT CATEGORY</p>
        <p>{item.name}</p>
        <p>PRICE</p>
        <p>STAR RATING</p>
    </div>
  );
};

export default Product;

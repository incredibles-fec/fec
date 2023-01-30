import React from 'react';

const Product = ({item}) => {
  return (
    <div className='productCard'>
      <i className="fa-regular fa-star"></i>
       <div>IMAGE</div>
        <div>CATEGORY</div>
        <div>{item.name}</div>
        <div>PRICE</div>
        <div>STAR RATING</div>
    </div>
  );
};

export default Product;

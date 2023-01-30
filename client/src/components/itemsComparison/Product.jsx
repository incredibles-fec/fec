import React from 'react';

const Product = ({item}) => {
  return (
    <div className='productCard'>
       <div>IMAGE</div>
        <div>CATEGORY</div>
        <div>{item.name}</div>
        <div>PRICE</div>
        <div>STAR RATING</div>
    </div>
  );
};

export default Product;

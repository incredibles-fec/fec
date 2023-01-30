import React from 'react';

const Product = ({item}) => {

  const [placeholder, setPlaceholder] = React.useState('');

  return (
    <div className='productCard'>
      <div className='innerCard'>
        <i className="fa-regular fa-star"></i>
        <div>IMAGE</div>
        <div>CATEGORY</div>
        <div>{item.name}</div>
        <div>PRICE</div>
        <div>STAR RATING</div>
      </div>
    </div>
  );
};

export default Product;

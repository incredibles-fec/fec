import React from 'react';
import ProductModal from './ProductModal.jsx';

export default function Product({ item }) {
  const [visibleStatus, setvisibleStatus] = React.useState(false);

  const changeModal = () => {
    setvisibleStatus(!visibleStatus);
  };

  return (
    <div className="productCard">
      <div className="cardContent">
        <img className="relatedImage" src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" alt="current item - need to update" />
        <i onClick={changeModal} className="fas fa-star" />
        <div className="productCardCategory">CATEGORY</div>
        <div className="productCardName">{item.name}</div>
        <div className="productCardPrice">PRICE</div>
        {/* <div className="productCardRating">STAR RATING</div> */}
      </div>
      <ProductModal visible={visibleStatus} onClick={changeModal} />
    </div>
  );
}

import React from 'react';
import ProductModal from './ProductModal.jsx';

export default function Product({ item, count }) {
  const [visibleStatus, setvisibleStatus] = React.useState(false);

  const changeModal = () => {
    setvisibleStatus(!visibleStatus);
  };

  return (
    <div className="productCard" id={count}>
      <div className="cardContent">
        <img className="relatedImage" src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" alt="current item - need to update" />
        <i onClick={changeModal} className="fas fa-star" />
        <div className="productCardCategory">{item.category}</div>
        <div className="productCardName">{item.name}</div>
        {item.salePrice !== null ? (
          <div className="priceInfo">
            <div className="productCardSale">{item.salePrice} SALE</div>
            <div className="productCardPriceSale">{item.price}</div>
          </div>
        ) :
          <div className="productCardPrice">{item.price}</div>}
        {/* <div className="productCardRating">STAR RATING</div> */}
      </div>
      <ProductModal visible={visibleStatus} onClick={changeModal} />
    </div>
  );
}

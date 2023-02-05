import React from 'react';
import ProductModal from './ProductModal.jsx';

export default function Product({ item, count, onUpdate }) {
  const [visibleStatus, setvisibleStatus] = React.useState(false);

  const changeModal = () => {
    setvisibleStatus(!visibleStatus);
  };

  return (
    <div className="productCard" id={count} onClick={onUpdate}>
      <div className="cardContent" id={item.id}>
        <img className="relatedImage" src={item.image} alt="current product" />
        <i onClick={changeModal} className="fas fa-star" />
        <div className="productCardCategory">{item.category}</div>
        <div className="productCardName">{item.name}</div>
        {item.salePrice !== null ? (
          <div className="priceInfo">
            <div className="productCardSale">${item.salePrice}</div>
            <div className="productCardPriceSale">${item.price}</div>
          </div>
        ) :
          <div className="productCardPrice">${item.price}</div>}
        {/* <div className="productCardRating">STAR RATING</div> */}
      </div>
      <ProductModal visible={visibleStatus} onClick={changeModal} />
    </div>
  );
}

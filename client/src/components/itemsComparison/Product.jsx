import React from 'react';
import ProductModal from './ProductModal.jsx';
import Image from '../../assets/edna.png';

export default function Product({
  item, count, onUpdate, currentProduct
}) {
  const [visibleStatus, setvisibleStatus] = React.useState(false);

  const changeModal = (e) => {
    setvisibleStatus(!visibleStatus);
  };

  return (
    <div className="productCardContainer" id={count} onClick={(e) => onUpdate(e, item.id)}>
      <div className="cardContent" id={item.id}>
        <div className="imageContainer">
          <img className="cardImage" src={item.image || Image} alt="apparel item" />
        </div>
        <i onClick={changeModal} className="fas fa-star" data-testid="modal" />
        <div className="productCardCategory">{item.category}</div>
        <div className="productCardName">{item.name}</div>
        {item.salePrice !== null ? (
          <div className="priceInfo" data-testid="productSale">
            <div className="productCardSale">${item.salePrice}</div>
            <div className="productCardPriceSale">${item.price}</div>
          </div>
        ) :
          <div className="productCardPrice" data-testid="productDefault">${item.price}</div>}
        {/* <div className="productCardRating">STAR RATING</div> */}
      </div>
      <ProductModal
        visible={visibleStatus}
        onClick={changeModal}
        currentProduct={currentProduct}
        item={item}
      />
    </div>
  );
}

import React from 'react';
import Image from '../../assets/edna-image-unavailable.jpg';

export default function Product({
  item, count, onUpdate, changeModal
}) {
  console.log('ITEM ', item);
  return (
    <div className="productCardContainer" id={count} onClick={(e) => onUpdate(e, item.id)}>
      <div className="cardContent" id={item.id}>
        <div className="imageContainer">
          <img className="cardImage" src={item.image || Image} alt="apparel item" />
        </div>
        <i onClick={(e) => changeModal(e, item)} className="fas fa-star" data-testid="modal" />
        <div className="productCardCategory">{item.category}</div>
        <div className="productCardName">{item.name}</div>
        {item.salePrice !== null ? (
          <div className="priceInfo" data-testid="productSale">
            <div className="productCardSale">${item.salePrice}</div>
            <div className="productCardPriceSale">${item.price}</div>
          </div>
        ) :
          <div className="productCardPrice" data-testid="productDefault">${item.price}</div>}
      </div>
    </div>
  );
}

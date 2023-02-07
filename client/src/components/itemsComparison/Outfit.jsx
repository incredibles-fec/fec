import React from 'react';
import Image from '../../assets/edna.png';

export default function Outfit({ item, onRemoveFromOutfit, count }) {
  return (
    <div className="outfitCardContainer" id={item.id}>
      <div className="cardContent" id={count}>
        <div className="imageContainer">
          <img className="cardImage" src={item.image || Image} alt="apparel item" />
        </div>
        <i className="fa-regular fa-circle-xmark fa-lg" onClick={(e) => onRemoveFromOutfit(e, item.id)} id={item.name} />
        <div className="productCardCategory">{item.category}</div>
        <div className="productCardName">{item.name}</div>
        {item.sale_price !== null ? (
          <div className="priceInfo">
            <div className="productCardSale">{item.sale_price}</div>
            <div className="productCardPriceSale">${item.default_price}</div>
          </div>
        ) :
          <div className="productCardPrice">${item.default_price}</div>}
      </div>
    </div>
  );
}

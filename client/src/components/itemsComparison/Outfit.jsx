import React from 'react';

export default function Outfit({ item, onRemoveFromOutfit }) {
  console.log('ITEM ', item);
  return (
    <div className="outfitCard">
      <div className="cardContent">
        <img className="relatedImage" src={item.image} alt="current item - need to update" />
        <i className="fa-regular fa-circle-xmark fa-lg" onClick={onRemoveFromOutfit} id={item.name} />
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

import React from 'react';

export default function Outfit({ item, onRemoveFromOutfit }) {
  return (
    <div className="outfitCard">
      <div className="cardContent">
        <img className="relatedImage" src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" alt="current item - need to update" />
        <i className="fa-regular fa-circle-xmark fa-lg" onClick={onRemoveFromOutfit} id={item.name} />
        <div className="productCardCategory">{item.category}</div>
        <div className="productCardName">{item.name}</div>
        <div className="productCardPrice">{item.price}</div>
      </div>
    </div>
  );
}

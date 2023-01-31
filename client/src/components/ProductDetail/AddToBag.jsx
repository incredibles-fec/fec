import React, { useState } from 'react';

export default function AddToBag({ product, styles}) {
  return (
    <div>
      <div className="add-to-bag">Select Size and Quantity, then Add to Bag</div>
      <select className="style-sizes" form="sizes-form">
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <select className="style-quantity" form="sizes-quantity-form">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <form className="add-to-bag-button">
        <input type="submit" value="Add to Bag (+)" onClick={(e) => e.preventDefault()} />
      </form>
      <form className="add-to-favorites">
        <input type="submit" value="&#9734;" onClick={(e) => e.preventDefault()} />
      </form>
    </div>
  );
}

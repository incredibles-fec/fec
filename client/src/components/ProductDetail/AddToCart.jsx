import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import select2 from 'select2';

export default function AddToCart({ style }) {
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState([]);
  // const sizeSelectorRef = useRef(null);

  const getQuantity = (skuNum) => {
    const stock = style.skus[skuNum].quantity;
    const max = stock > 15 ? 15 : stock;
    const temp = [];
    for (let i = 1; i <= max; i += 1) {
      temp.push(<option key={i} value={i}>{i}</option>);
    }
    setQuantity(temp);
  };

  useEffect(() => {
    // eslint-disable-next-line max-len
    const loadNewSizes = Object.keys(style.skus).map((k) => <option value={k} key={k}>{style.skus[k].size}</option>);
    if (loadNewSizes.length) {
      loadNewSizes.unshift(<option value="none" key="select-size" hidden>Select Size</option>);
    } else {
      loadNewSizes.push(<option value="none" key="oos">OUT OF STOCK</option>);
      document.getElementById('style-sizes').disabled = true;
      document.getElementById('style-quantity').disabled = true;
      document.getElementById('add-to-cart-button').hidden = true;
    }
    setSizes(loadNewSizes);
    setQuantity([<option value="none" key="select-quantity">---</option>]);
  }, [style]);

  const handleSizeSelection = (e) => {
    getQuantity(e.target.value);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    const sizeSelector = document.getElementById('style-sizes');
    const quantitySelector = document.getElementById('style-quantity');
    if (sizeSelector.value === 'none') {
      // sizeSelector.size = sizes.length-1;
      // sizeSelector[1].focus();
      // $('#style-sizes').select2();
      // $('#style-sizes').select2('open');
    } else {
      sizeSelector.size = 0;
      quantitySelector.size = 0;
    }
  };

  return (
    <div className="add-to-cart-or-favorites">
      <form id="add-to-cart">
        <select id="style-sizes" form="sizes-form" onChange={handleSizeSelection}>
          {sizes}
        </select>
        <select id="style-quantity" form="sizes-quantity-form">
          {quantity}
        </select>
      </form>
      <div className="cart-and-favorites-buttons">
        <button id="add-to-cart-button" type="submit" value="Add to Cart (+)" onClick={handleAddToCart}>Add to Cart</button>
        <form className="add-to-favorites">
          <input type="submit" value="&#9734;" onClick={(e) => e.preventDefault()} />
        </form>
      </div>
    </div>
  );
}

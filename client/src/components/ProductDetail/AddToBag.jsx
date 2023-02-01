import React, { useState, useEffect } from 'react';

export default function AddToBag({ style }) {
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState([]);

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
    if (!Object.keys(style.skus)) {
      document.getElementyById('add-to-bag').setAttribute('disabled', 'true');
    } else {
      // eslint-disable-next-line max-len
      setSizes(Object.keys(style.skus).map((k) => <option value={k} key={k}>{style.skus[k].size}</option>));
      getQuantity(Object.keys(style.skus)[0]);
    }
  }, [style]);

  const handleSizeSelection = (e) => {
    getQuantity(e.target.value);
  };

  return (
    <div className="add-to-bag-or-favorites">
      <form id="add-to-bag">
        <select id="style-sizes" form="sizes-form" onChange={handleSizeSelection}>
          {sizes}
        </select>
        <select id="style-quantity" form="sizes-quantity-form">
          {quantity}
        </select>
      </form>
      <div className="bag-and-favorites-buttons">
        <button className="add-to-bag-button" type="submit" value="Add to Bag (+)" onClick={(e) => e.preventDefault()}>Add to Bag</button>
        <form className="add-to-favorites">
          <input type="submit" value="&#9734;" onClick={(e) => e.preventDefault()} />
        </form>
      </div>
    </div>
  );
}

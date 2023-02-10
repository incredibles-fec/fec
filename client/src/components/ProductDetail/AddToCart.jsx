/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { postToCart, logInteractions } from '../../state/pd';

export default function AddToCart({ style }) {
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const dispatch = useDispatch();

  const handleQuantityOptionClick = (selectedQuantity) => {
    document.getElementById('quantity-text').textContent = selectedQuantity;
  };

  const getQuantity = (skuNum) => {
    const stock = style.skus[skuNum].quantity;
    const max = stock > 15 ? 15 : stock;
    const temp = [];
    for (let i = 1; i <= max; i += 1) {
      temp.push(<span key={i} onClick={() => { handleQuantityOptionClick(i); }}>{i}</span>);
    }
    setQuantity(temp);
  };

  const handleSizeOptionClick = (selectedSize, sku) => {
    document.getElementById('size-text').textContent = selectedSize;
    document.getElementById('size-dropdown-button')['data-sku'] = sku;
    getQuantity(document.getElementById('size-dropdown-button')['data-sku']);
    document.getElementById('quantity-text').textContent = 'Quantity ▼';
  };

  useEffect(() => {
    const loadNewSizes = Object.keys(style.skus).map((k) => <span key={k} data-sku={k} onClick={() => { handleSizeOptionClick(style.skus[k].size, k); }}>{style.skus[k].size}</span>);
    // eslint-disable-next-line dot-notation
    if (!style.skus['null']) {
      document.getElementById('size-text').textContent = 'Select Size ▼';
      document.getElementById('quantity-text').textContent = 'Quantity ▼';
    } else {
      document.getElementById('size-dropdown-button').textContent = 'OUT OF STOCK';
      document.getElementById('quantity-text').textContent = 'OOS';
      document.querySelectorAll('.dropdownButton').forEach((b) => b.style['pointer-events'] = 'none');
      document.getElementById('add-to-cart-button').style.display = 'none';
      document.getElementById('cartIcon').hidden = true;
    }
    setSizes(loadNewSizes);
  }, [style]);

  const handleSizeSelection = () => {
    document.getElementById('size-dropdown').classList.toggle('show');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    const sizeDropdown = document.getElementById('size-text');
    const quantityDropdown = document.getElementById('quantity-text');
    if (sizeDropdown.textContent === 'Select Size ▼') {
      handleSizeSelection();
    } else if (quantityDropdown.textContent === 'Quantity ▼') {
      quantityDropdown.textContent = 'Quantity ▼';
      document.getElementById('quantity-dropdown').classList.toggle('show');
    } else {
      dispatch(postToCart(document.getElementById('size-dropdown-button')['data-sku']));
      alert('Added to cart!');
    }
  };

  window.onclick = (event) => {
    let parentModule = event.target.closest('.parent');
    if (!parentModule) {
      parentModule = 'Related Items & Outfit Creation';
    } else {
      parentModule = parentModule.id;
    }
    const interactionObj = { element: event.target.outerHTML, widget: String(parentModule), time: String(Date.now()) };
    dispatch(logInteractions(interactionObj));

    const selectors = ['.dropdownButton', '#add-to-cart-button', '.translate', '#size-text', '#quantity-text'];
    if (!event.target.matches(selectors)) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      for (let i = 0; i < dropdowns.length; i += 1) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };

  return (
    <div className="add-to-cart-or-favorites">
      <form id="add-to-cart">
        <div className="dropdown">
          <div className="dropdownButton" id="size-dropdown-button" onClick={handleSizeSelection}>
            <div className="underline" />
            <a id="size-text">Select Size ▼</a>
          </div>
          <div id="size-dropdown" className="dropdown-content">
            {sizes}
          </div>
        </div>
        <div className="dropdown">
          <div className="dropdownButton" id="quantity-dropdown-button" onClick={() => { document.getElementById('quantity-dropdown').classList.toggle('show'); }}>
            <div className="underline" />
            <a id="quantity-text">Quantity ▼</a>
          </div>
          <div id="quantity-dropdown" className="dropdown-content">
            {quantity}
          </div>
        </div>
      </form>
      <div id="add-to-cart-and-favorite">
        <div className="pdButton" id="add-to-cart-button" onClick={handleAddToCart}>
          <div className="translate" />
          <a id="add-to-cart-label">Add to Cart</a>
        </div>
        <div className="pdButton" id="add-to-favorites" onClick={(() => alert('Favorited item!'))}>
          <div className="translate" />
          <a id="favorite-button">FAVORITE</a>
        </div>
      </div>
    </div>
  );
}

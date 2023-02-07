import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { postToCart, logInteractions } from '../../state/pd';

export default function AddToCart({ style }) {
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const dispatch = useDispatch();

  const handleQuantityOptionClick = (selectedQuantity) => {
    document.getElementById('quantity-dropdown-button').textContent = selectedQuantity;
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
    document.getElementById('size-dropdown-button').textContent = selectedSize;
    document.getElementById('size-dropdown-button')['data-sku'] = sku;
    getQuantity(document.getElementById('size-dropdown-button')['data-sku']);
    document.getElementById('quantity-dropdown-button').textContent = '---';
  };

  useEffect(() => {
    // eslint-disable-next-line max-len
    const loadNewSizes = Object.keys(style.skus).map((k) => <span key={k} data-sku={k} onClick={() => { handleSizeOptionClick(style.skus[k].size, k); }}>{style.skus[k].size}</span>);
    if (loadNewSizes.length) {
      document.getElementById('size-dropdown-button').textContent = 'Select Size';
      document.getElementById('quantity-dropdown-button').textContent = '---';
    } else {
      document.getElementById('size-dropdown-button').textContent = 'OUT OF STOCK';
      document.getElementById('quantity-dropdown-button').textContent = 'OOS';
      document.querySelectorAll('.dropdownButton').forEach((b) => b.disabled = true);
      document.getElementById('add-to-cart-button').hidden = true;
    }
    setSizes(loadNewSizes);
  }, [style]);

  const handleSizeSelection = () => {
    document.getElementById('size-dropdown').classList.toggle('show');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    const sizeDropdown = document.getElementById('size-dropdown-button');
    const quantityDropdown = document.getElementById('quantity-dropdown-button');
    if (sizeDropdown.textContent === 'Select Size') {
      sizeDropdown.textContent = 'Please Select a Size';
      handleSizeSelection();
    } else if (quantityDropdown.textContent === '---') {
      quantityDropdown.textContent = 'Select Quantity';
      document.getElementById('quantity-dropdown').classList.toggle('show');
    } else {
      dispatch(postToCart(document.getElementById('size-dropdown-button')['data-sku']));
      alert('Added to cart!');
    }
  };

  window.onclick = (event) => {
    const interactionObj = { element: event.target.outerHTML, widget: String(event.target.closest('.parent').id), time: String(Date.now()) };
    dispatch(logInteractions(interactionObj));

    if (!event.target.matches('.dropdownButton') && !event.target.matches('#add-to-cart-button')) {
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
          <div id="dropdown-buttons" onClick={handleSizeSelection}>
            <button className="dropdownButton" id="size-dropdown-button" type="button">Select Size</button>
            <button className="dropdownButton" type="button"> <i className="fa-solid fa-angle-down"/> </button>
          </div>
          <div id="size-dropdown" className="dropdown-content">
            {sizes}
          </div>
        </div>
        <div className="dropdown">
          <div id="dropdown-buttons" onClick={() => { document.getElementById('quantity-dropdown').classList.toggle('show'); }}>
            <button className="dropdownButton" id="quantity-dropdown-button" type="button">---</button>
            <button className="dropdownButton" type="button"> <i className="fa-solid fa-angle-down" /> </button>
          </div>
          <div id="quantity-dropdown" className="dropdown-content">
            {quantity}
          </div>
        </div>
      </form>
      <div id="cart-and-favorites-buttons">
        <div id="add-to-cart-buttons" onClick={handleAddToCart}>
          <button id="add-to-cart-button" type="submit" value="Add to Cart">Add to Cart</button>
          <button className="dropdownButton" id="cartIcon" type="button"> <i className="fa-brands fa-opencart" /> </button>
        </div>
        <button id="add-to-favorites" type="submit" value="Add to Favorites" onClick={(e) => e.preventDefault()}>&#9734;</button>
      </div>
    </div>
  );
}

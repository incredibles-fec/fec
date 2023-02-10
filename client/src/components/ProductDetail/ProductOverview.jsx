import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, changeCurrentProductById } from '../../state/pd';
import ProductInformation from './ProductInformation.jsx';
import ProductDescription from './ProductDescription.jsx';

export default function ProductDetail() {
  const [theme, setTheme] = useState('light');
  const { loading } = useSelector((state) => state.pd);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    document.getElementById('theme').href = `${theme}Mode.css`;
  }, [theme]);

  useEffect(() => {
    // dispatch(getProducts());
    dispatch(changeCurrentProductById(40351));
    // dispatch(changeCurrentProductById(40347));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const pID = e.target.elements.searchProducts.value;
    dispatch(changeCurrentProductById(pID));
  };

  if (!loading) {
    return (
      <div className="pd-flex-container parent" id="Product Detail">
        <div className="nav-bar">
          <h2 className="logo"><i>Incredible Apparel</i></h2>
          <div id="search-products">
            <form onSubmit={(e) => handleSearch(e)}><i className="fa-solid fa-magnifying-glass" aria-hidden="true" />: <input id="search-input-form" name="searchProducts" type="search" placeholder="VALID PROD IDS ONLY" />
            </form>
          </div>
        </div>
        <div className="toggle-wrapper">
          <h4 className="site-wide-announcement">SITE-WIDE ANNOUNCEMENT MESSAGE! - <b>NO REFUNDS!!!</b></h4>
          <label className="switch">
            <input type="checkbox" onClick={() => toggleTheme()} />
            <span className="slider round" />
          </label>
        </div>

        <ProductInformation />
        <ProductDescription />
        <div className="colorSeparator" />
      </div>
    );
  }
  return (
    <div className="loading-container">
      <div className="loading" aria-label="Loading"><p>LOADING</p>
        <span className="loading-span" />
      </div>
    </div>
  );
}

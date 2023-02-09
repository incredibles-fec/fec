import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, changeCurrentProductById } from '../../state/pd';
import ProductInformation from './ProductInformation.jsx';
import ProductDescription from './ProductDescription.jsx';

export default function ProductDetail() {
  const { loading } = useSelector((state) => state.pd);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getProducts());
    // dispatch(changeCurrentProductById(40355));
    dispatch(changeCurrentProductById(40347));
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
            <form onSubmit={(e) => handleSearch(e)}><i className="fa-solid fa-magnifying-glass" />: <input id="search-input-form" name="searchProducts" type="search" placeholder="VALID PROD IDS ONLY" />
            </form>
          </div>
        </div>
        <h4 className="site-wide-announcement">SITE-WIDE ANNOUNCEMENT MESSAGE! - <b>NO REFUNDS!!!</b></h4>
        <ProductInformation />
        <ProductDescription />
      </div>
    );
  }
  return (
    <div id="loading">
      {/* <p>Loading... </p> */}
    </div>
  );
}

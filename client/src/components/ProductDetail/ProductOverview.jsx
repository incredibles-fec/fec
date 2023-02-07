import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, changeCurrentProductById } from '../../state/pd';
import ProductInformation from './ProductInformation.jsx';
import ProductDescription from './ProductDescription.jsx';

export default function ProductDetail() {
  const { loading } = useSelector((state) => state.pd);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    // dispatch(changeCurrentProductById(40355));
    // dispatch(changeCurrentProductById(40347));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let pID = e.target.elements.searchProducts.value;
    dispatch(changeCurrentProductById(pID));
  };

  if (!loading) {
    return (
      <div className="pd-flex-container">
        <div className="nav-bar">
          <h2 className="logo"><i>Incredible Apparel</i></h2>
          <div className="search">
            <form onSubmit={(e) => handleSearch(e)}>&#x1F50E;: <input name="searchProducts" type="search" placeholder="VALID PROD IDS ONLY" />
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
      <p>LOADING... </p>
    </div>
  );
}

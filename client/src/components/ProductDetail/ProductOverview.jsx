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
    // dispatch(changeCurrentProductById(40346));
  }, []);

  if (!loading) {
    return (
      <div className="pd-flex-container">
        <h1 className="nav-bar">Navigation Bar with Logo</h1>
        <h4 className="site-wide-announcement">SITE-WIDE ANNOUNCEMENT MESSAGE! - <b>NO REFUNDS!!!</b></h4>
        <ProductInformation />
        <ProductDescription />
      </div>
    );
  }
  return (
    <div>
      <h1>LOADING... </h1>
    </div>
  );
}

import React from 'react';
import App from '../../App.jsx';
import ProductList from './ProductList.jsx';
import OutfitList from './OutfitList.jsx';

const RelatedOutfits = () => {
  // I believe we need to import this module into product detail -- then we
  // can transfer the target value down as a prop

  return (
    <div>
        <ProductList/>
        <OutfitList/>
    </div>
  );
}

export default RelatedOutfits;

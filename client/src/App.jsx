import React from 'react';
import ProductDetail from './components/ProductDetail/index.jsx';
import RelatedOutfits from './components/itemsComparison/index.jsx';
import QA from './components/QA/QAList.jsx';
import ItemsComparison from './components/itemsComparison/index.jsx';
import Ratings from './components/ratings/index.jsx';
import './assets/ro.css';

export default function App() {
  return (
    <div>
      <ProductDetail />
      <ItemsComparison />
      <QA />
      <Ratings />
    </div>
  );
}

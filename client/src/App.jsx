import React from 'react';
import ProductDetail from './components/ProductDetail/index.jsx';
import ItemsComparison from './components/itemsComparison/index.jsx';
import QA from './components/QA/QA.jsx';
import RR from './components/RatingsReviews/RR.jsx';

export default function App() {
  return (
    <div>
      <ProductDetail />
      <ItemsComparison />
      <QA />
      <RR />
    </div>
  );
}

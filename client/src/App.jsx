import React from 'react';
import ProductDetail from './components/ProductDetail/index.jsx';
import RelatedOutfits from './components/itemsComparison/index.jsx';
import QA from './components/QA/index.jsx';
import Ratings from './components/ratings/index.jsx';
import './assets/ro.css';

const App = () => (
  <div>
    <ProductDetail />
    <RelatedOutfits />
    <QA />
    <Ratings />
  </div>
);

export default App;

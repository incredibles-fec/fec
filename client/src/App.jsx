import React from 'react';
import ProductDetail from './components/ProductDetail/ProductOverview.jsx';
// import RelatedOutfits from './components/itemsComparison/index.jsx';
import ItemsComparison from './components/itemsComparison/index.jsx';
import QuestionsAnswers from './components/QA/QA.jsx';
import RatingsReviews from './components/RatingsReviews/RR.jsx';

export default function App() {
  return (
    <React.StrictMode>
      <div className="main-container">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round" />
        </label>
        <ProductDetail />
        <ItemsComparison />
        <QuestionsAnswers />
        <RatingsReviews />
      </div>
    </React.StrictMode>
  );
}

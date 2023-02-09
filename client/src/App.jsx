import React from 'react';
import ProductDetail from './components/ProductDetail/ProductOverview.jsx';
// import RelatedOutfits from './components/itemsComparison/index.jsx';
import ItemsComparison from './components/itemsComparison/index.jsx';
import QuestionsAnswers from './components/QA/QA.jsx';
import RatingsReviews from './components/RatingsReviews/RR.jsx';

export default function App() {
  return (
    <React.StrictMode>
      <ProductDetail />
      <ItemsComparison />
      <QuestionsAnswers />
      <RatingsReviews />
    </React.StrictMode>
  );
}

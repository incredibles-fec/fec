import React from 'react';
import axios from 'axios';
import Product from './Product.jsx';

export default function ProductList() {
  const [products, setProducts] = React.useState([]);
  const [previousVisble, setPreviousVisble] = React.useState(false);
  const [nextVisible, setnextVisible] = React.useState(true);

  let firstSlide = 0;
  let lastSlide = 4;

  const obtainProducts = () => {
    axios.get('/products')
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .then(()=> {
        // axios get call to products id styles
      })
      .catch((error) => {
        console.log('fetch of products failed with error: ', error);
      });
  };

  const onNext = () => {
    if (firstSlide >= 0) {
      setPreviousVisble(true);
    }
    if (lastSlide >= 9) {
      setnextVisible(false);
    }

    const cardToView = document.getElementById(lastSlide);
    cardToView.scrollIntoView();
    firstSlide++
    lastSlide++
  };

  const onBack = () => {
    if (firstSlide === 0) {
      setPreviousVisble(false);
    }
    const cardToView = document.getElementById(firstSlide);
    cardToView.scrollIntoView();
    firstSlide--;
    lastSlide--;
  };

  React.useEffect(() => {
    obtainProducts();
  }, []);

  let num = 0;

  return (
    <div>
      <h3>Related Products</h3>
      <div className="relatedProductsCarousel">
        <div className="relatedProductContainer">
          {products.map((item) => (<Product item={item} key={item.id} count={num++}/>))}
        </div>
        <div className="carouselActions">
          { previousVisble ?
          <button type="button" className="previousProduct" onClick={onBack}>&lt;</button> : null }

          {  nextVisible ?
            <button type="button" className="nextProduct" onClick={onNext}>&gt;</button> : null
          }
        </div>
      </div>
    </div>
  );
}

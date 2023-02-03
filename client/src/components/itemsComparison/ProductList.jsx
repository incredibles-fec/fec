import React from 'react';
import axios from 'axios';
import Product from './Product.jsx';

export default function ProductList() {
  const [products, setProducts] = React.useState([]);
  const [styles, setStyles] = React.useState([]);
  const [previousVisble, setPreviousVisble] = React.useState(false);
  const [nextVisible, setnextVisible] = React.useState(true);
  const [firstSlide, setFirstSlide] = React.useState(0);
  const [lastSlide, setLastSlide] = React.useState(4);

  const obtainProducts = () => {
    axios.get('/products')
      .then((response) => {
        setProducts(response.data);
        const productId = response.data[0].id;
        axios.get(`/products/${productId}/styles`)
          .then((styleResponse) => {
            console.log(styleResponse);
            setStyles(styleResponse);
          });
      })
      .catch((error) => {
        console.log('fetch of products failed with error: ', error);
      });
  };

  // obtain products order of operations
  // user selects a specific product
    // make call to related products endpoint
      // receive list of related products (ids)
      // create variable to store newlist
      // iterate over list of products - for each product
        // make call to products/product_id endpoint
          // add response to new list of products
          // capture id of current product
          // make a call to products/product_id/styles
            // add responses image to relevant object in newlist
      // set currentproducts equal to newlist

  const onNext = () => {
    if (firstSlide >= 0) {
      setPreviousVisble(true);
    }
    if (lastSlide >= 9) {
      setnextVisible(false);
    }

    const cardToView = document.getElementById(lastSlide);
    cardToView.scrollIntoView();
    setFirstSlide(firstSlide + 1);
    setLastSlide(lastSlide + 1);
  };

  const onBack = () => {
    if (firstSlide === 0) {
      setPreviousVisble(false);
    } else if (lastSlide >= 9) {
      setnextVisible(true);
    }
    const cardToView = document.getElementById(firstSlide);
    cardToView.scrollIntoView();
    setFirstSlide(firstSlide - 1);
    setLastSlide(lastSlide - 1);
  };

  console.log('first ', firstSlide);
  console.log('last ', lastSlide);
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

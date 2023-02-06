import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Product from './Product.jsx';
import { changeCurrentProductById } from '../../state/pd.js';

export default function ProductList({ currentProduct, relatedList }) {
  const [previousVisble, setPreviousVisble] = React.useState(false);
  const [nextVisible, setnextVisible] = React.useState(true);
  const [firstSlide, setFirstSlide] = React.useState(0);
<<<<<<< HEAD
  const [lastSlide, setLastSlide] = React.useState(4);

  const obtainProducts = () => {
    axios
      .get('/products')
      .then((response) => {
        setProducts(response.data);
        const productId = response.data[0].id;
        axios.get(`/products/${productId}/styles`).then((styleResponse) => {
          setStyles(styleResponse);
        });
      })
      .catch((error) => {
        console.log('fetch of products failed with error: ', error);
      });
  };

  // obtain products order of operations
  // user selects a specific product
  // make call to related products endpoint (products/productId/related)
  // receive list of related products (array of ids)
  // create variable to store newlist (will become an array of objects)
  // iterate over list of related products - for each product
  // make call to product id endpoint (products/productId)
  // (response will be an object)
  // add response to new list of products
  // capture product id of current product (response.id)
  // make a call to products/product_id/styles
  // add responses image, price/sale price to relevant object in newlist
  //// response[0].original_price, response[0].sale_price, response[0].photos[0].thumbnail_url
  // set currentproducts equal to newlist
=======
  const [lastSlide, setLastSlide] = React.useState(3);
>>>>>>> efadc1911d8f287030a27f6e44c9faa084e31910

  const onNext = () => {
    if (firstSlide >= 0) {
      setPreviousVisble(true);
    }
    if (lastSlide >= relatedList.length - 2) {
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
    } else if (lastSlide >= relatedList.length - 2) {
      setnextVisible(true);
    }
    const cardToView = document.getElementById(firstSlide);
    cardToView.scrollIntoView();
    setFirstSlide(firstSlide - 1);
    setLastSlide(lastSlide - 1);
  };

  const onUpdate = (e) => {
    if (e.target.className !== 'fas fa-star' && e.target.className !== 'modalExit') {
      const currentProductId = e.nativeEvent.path[1].id;
      changeCurrentProductById(currentProductId);
    }
  };

  let num = 0;

  return (
    <div>
      <h3>Related Products</h3>
      <div className="relatedProductsCarousel">
        <div className="relatedProductContainer">
<<<<<<< HEAD
          {products.map((item) => (
            <Product item={item} key={item.id} count={num++} />
          ))}
        </div>
        <div className="carouselActions">
          {previousVisble ? (
            <button type="button" className="previousProduct" onClick={onBack}>
              &lt;
            </button>
          ) : null}
          {nextVisible ? (
            <button type="button" className="nextProduct" onClick={onNext}>
              &gt;
            </button>
          ) : null}
=======
          {relatedList.map((item, index) => {
            if (item.id !== currentProduct.id) {
              return (
                <Product
                  key={index}
                  item={item}
                  count={num++}
                  onUpdate={onUpdate}
                  currentProduct={currentProduct}
                />
              );
            }
          })}
        </div>
        <div className="carouselActions">
          { previousVisble ?
            <button type="button" className="previousProduct" onClick={onBack}>&lt;</button> : null }
          { nextVisible ?
            <button type="button" className="nextProduct" onClick={onNext}>&gt;</button> : null}
>>>>>>> efadc1911d8f287030a27f6e44c9faa084e31910
        </div>
      </div>
    </div>
  );
}

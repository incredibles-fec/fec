import React from 'react';
import axios from 'axios';
import Product from './Product.jsx';

export default function ProductList() {
  const [products, setProducts] = React.useState([]);
  const [details, setDetails] = React.useState([]);

  let firstSlide = 0;
  let lastSlide = 0;

  // obtain list of products
  const obtainProducts = () => {
    axios.get('/products')
      .then((response) => {
        setProducts(response.data);
        console.log(products);
      })
      .catch((error) => {
        console.log('fetch of products failed with error: ', error);
      });
  };

  const onNext = () => {
    firstSlide++
    lastSlide++
    console.log(firstSlide);
  };

  const onBack = () => {
    firstSlide--
    lastSlide--
    console.log(products);
  };
  // on page load, execute function
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
          <button type="button" className="previousProduct" onClick={onBack}>previous</button>
          <button type="button" className="nextProduct" onClick={onNext}>next</button>
        </div>
      </div>
    </div>
  );
}

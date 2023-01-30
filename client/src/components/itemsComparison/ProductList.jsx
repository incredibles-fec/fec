import React from 'react';
import axios from 'axios';
import Product from './Product.jsx';

export default function ProductList() {
  const [products, setProducts] = React.useState([]);
  const [details, setDetails] = React.useState([]);

  // obtain list of products
  const obtainProducts = () => {
    axios.get('/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log('fetch of products failed with error: ', error);
      });
  };

  // on page load, execute function
  React.useEffect(() => {
    obtainProducts();
  }, []);

  return (
    <div>
      <h3>Related Products</h3>
      <div className="relatedProductContainer">
        {products.map((item) => (<Product item={item} key={item.id} />))}
      </div>
    </div>
  );
}

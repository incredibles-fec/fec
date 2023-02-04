import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Product from './Product.jsx';

export default function ProductList() {
  const [relatedList, setRelatedList] = React.useState([]);
  const { currentProduct, currentProductStyles } = useSelector((state) => state.pd);
  const [products, setProducts] = React.useState([]);
  const [previousVisble, setPreviousVisble] = React.useState(false);
  const [nextVisible, setnextVisible] = React.useState(true);
  const [firstSlide, setFirstSlide] = React.useState(0);
  const [lastSlide, setLastSlide] = React.useState(3);

  const obtainProducts = () => {
    const productId = currentProduct.id;
    axios.get(`/products/${productId}/related`)
      .then((response) => {
        const options = [];
        const relatedProducts = response.data;
        relatedProducts.forEach((related) => {
          axios.get(`/products/${related}`)
            .then((idResponse) => {
              options.push(idResponse.data);
              setRelatedList([...relatedList, idResponse.data]);
              setRelatedList(options);

              axios.get(`/products/${related}/styles`)
                .then((styleInfo) => {
                  const photo = styleInfo.data.results[0].photos[0].thumbnail_url;
                  const price = styleInfo.data.results[0].original_price;
                  const salePrice = styleInfo.data.results[0].sale_price;
                  const id = styleInfo.data.product_id;
                  options.forEach((product) => {
                    console.log('productID ', product.id);
                    console.log('id ', id);
                    if (product.id.toString() === id) {
                      console.log('TRUE');
                      product.image = photo;
                      product.price = price;
                      product.salePrice = salePrice;
                    }
                  });

                  setRelatedList([...relatedList, styleInfo.data]);
                  setRelatedList(options);
                  console.log('OPTIONS ', options);
                });
            })
            .catch((err) => {
              console.log('product ID fetch failed with err ', err);
            });
        });
      })
      .catch((error) => {
        console.log('fetch of products failed with error: ', error);
      });
  };

  // add responses image, price/sale price to relevant object in newlist
  // set currentproducts equal to newlist

  React.useEffect(() => {
    if (currentProduct !== null) {
      obtainProducts();
    }
  }, currentProduct);

  // React.useEffect(() => {
  //   obtainProducts();
  // }, []);

  const onNext = () => {
    if (firstSlide >= 0) {
      setPreviousVisble(true);
    }
    if (lastSlide >= relatedList.length - 1) {
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
    } else if (lastSlide >= relatedList.length - 1) {
      setnextVisible(true);
    }
    const cardToView = document.getElementById(firstSlide);
    cardToView.scrollIntoView();
    setFirstSlide(firstSlide - 1);
    setLastSlide(lastSlide - 1);
  };

  let num = 0;

  return (
    <div>
      <h3>Related Products</h3>
      <div className="relatedProductsCarousel">
        <div className="relatedProductContainer">
          {relatedList.map((item) => (<Product item={item} key={item.id} count={num++} />))}
        </div>
        <div className="carouselActions">
          { previousVisble ?
            <button type="button" className="previousProduct" onClick={onBack}>&lt;</button> : null }
          { nextVisible ?
            <button type="button" className="nextProduct" onClick={onNext}>&gt;</button> : null}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ProductList from './ProductList.jsx';
import OutfitList from './OutfitList.jsx';

export default function RelatedOutfits() {
  const { currentProduct, loading } = useSelector((state) => state.pd);
  const [relatedList, setRelatedList] = React.useState([]);

  const obtainProducts = () => {
    const productId = currentProduct.id;
    axios.get(`/products/${productId}/related`)
      .then((response) => {
        const options = [];
        const relatedProducts = response.data.concat(currentProduct.id);

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
                    if (product.id.toString() === id) {
                      product.image = photo;
                      product.price = price;
                      product.salePrice = salePrice;
                    }
                  });
                  setRelatedList([...relatedList, styleInfo.data]);
                  setRelatedList(options);
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

  React.useEffect(() => {
    if (currentProduct !== null) {
      obtainProducts();
    }
  }, [currentProduct]);

  if (!loading) {
    return (
      <div>
        <div className="relatedProductOutfit parent" id="Related Items & Outfit Creation">
          <ProductList currentProduct={currentProduct} relatedList={relatedList} />
          <OutfitList currentProduct={currentProduct} relatedList={relatedList} />
        </div>
        <div className="colorSeparatorEnd" />
      </div>
    );
  }
  return (
    <div />
  );
}

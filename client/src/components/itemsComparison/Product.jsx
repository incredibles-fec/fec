import React from 'react';
import ProductModal from './ProductModal.jsx';

export default function Product({
  item, count, onUpdate, currentProduct
}) {
  const [visibleStatus, setvisibleStatus] = React.useState(false);

  const changeModal = (e) => {
    setvisibleStatus(!visibleStatus);
    // const currentProductInfo = currentProduct;
    // return currentProductInfo;
    console.log(e);
  };

  // TODO - outline characteristics

  // capture id of current product being viewed (current)
  // capture id of current product in card (card)

  // make call to get information about current
  // store relevant information in an object
  // make call to get information about card
  // store relevant information in an object

  // iterate over first object
  // iterate over second object as inner loop
  // add row to table
  /// / add key of first object as characteristic to second column
  /// / add value of first object to first column
  /// / add value of second object as characteristic to third column

  return (
    <div className="productCard" id={count} onClick={onUpdate}>
      <div className="cardContent" id={item.id}>
        <img className="relatedImage" src={item.image} alt="current product" />
        <i onClick={changeModal} className="fas fa-star" />
        <div className="productCardCategory">{item.category}</div>
        <div className="productCardName">{item.name}</div>
        {item.salePrice !== null ? (
          <div className="priceInfo">
            <div className="productCardSale">${item.salePrice}</div>
            <div className="productCardPriceSale">${item.price}</div>
          </div>
        ) :
          <div className="productCardPrice">${item.price}</div>}
        {/* <div className="productCardRating">STAR RATING</div> */}
      </div>
      <ProductModal
        visible={visibleStatus}
        onClick={changeModal}
        currentProduct={currentProduct}
        item={item}
      />
    </div>
  );
}

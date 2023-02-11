import React from 'react';
import ProductModal from './ProductModal.jsx';
import { useSelector } from 'react-redux';
import Image from '../../assets/edna-image-unavailable.jpg';
import StarRatings from '../common/StarRatings.jsx';


export default function Product({
  item, count, onUpdate, currentProduct
}) {
  const [visibleStatus, setvisibleStatus] = React.useState(false);
  // const { totals, reviewCount } = useSelector((store) => store.rr);

  const changeModal = (e) => {
    e.preventDefault();
    setvisibleStatus(!visibleStatus);
  };

  return (
    <div className="productCardContainer" id={count} onClick={(e) => onUpdate(e, item.id)}>
      <div className="cardContent" id={item.id}>
        <div className="imageContainer">
          <img className="cardImage" src={item.image || Image} alt="apparel item" />
        </div>
        <i onClick={changeModal} className="fas fa-star" data-testid="modal" />
        <div className="productCardCategory">{item.category}</div>
        <div className="productCardName">{item.name}</div>
        {item.salePrice !== null ? (
          <div className="priceInfo" data-testid="productSale">
            <div className="productCardSale">${item.salePrice}</div>
            <div className="productCardPriceSale">${item.price}</div>
          </div>
        ) :
          <div className="productCardPrice" data-testid="productDefault">${item.price}</div>}
        {/* <div className="productCardRating">STAR RATING</div> */}
      </div>
      {/* { reviewCount !== 0 ? <div className="star-ratings-reviews"><StarRatings rating={totals?.average} /> </div> : null} */}
      <ProductModal
        visible={visibleStatus}
        onClick={changeModal}
        currentProduct={currentProduct}
        item={item}
      />
    </div>
  );
}

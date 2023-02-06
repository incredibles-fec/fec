import React from 'react';
import Outfit from './Outfit.jsx';
import { useSelector } from 'react-redux';

export default function OutfitList({ relatedList }) {
  const { currentProduct } = useSelector((state) => state.pd);
  const [outfitList, setOutfitList] = React.useState([]);

  const onAddToOutfit = () => {
    const correctProduct = relatedList.filter((item) => item.id === currentProduct.id);

    const product = {
      category: correctProduct[0].category,
      name: correctProduct[0].name,
      default_price: correctProduct[0].default_price,
      sale_price: correctProduct[0].salePrice,
      image: correctProduct[0].image,
      id: correctProduct[0].id,
    };

    const isFound = outfitList.some((value) => {
      if (value.id === product.id) {
        return true;
      }
      return false;
    });

    if (!isFound) {
      setOutfitList([...outfitList, product]);
    }

    // local storage testing
    // add item to local storage
    localStorage.setItem('44524', JSON.stringify({
      category: 'shorts',
      name: 'tulips'
    }));

    localStorage.setItem('44059', JSON.stringify({
      category: correctProduct[0].category,
      name: correctProduct[0].name,
      default_price: correctProduct[0].default_price,
      sale_price: correctProduct[0].salePrice,
      image: correctProduct[0].image,
      id: correctProduct[0].id,
    }));
  };

  const onRemoveFromOutfit = (e) => {
    const currentProductName = e.target.id;
    const newList = outfitList.filter((product) => product.name !== currentProductName);
    setOutfitList(newList);
  };

  return (
    <div className="outfitContainer">
      <h3>Your Outfit</h3>
      <div className="outfitItemContainer">
        <div className="addToOutfit">
          <div className="addToOutfitContainer" onClick={onAddToOutfit}>
            <h1>Add to Outfit</h1>
            <i className="fa-regular fa-plus" />
          </div>
        </div> { outfitList.length > 0 ?
          outfitList.map((item) => (
            <Outfit key={item.id} item={item} onRemoveFromOutfit={onRemoveFromOutfit} />
          )) : null }
      </div>
    </div>
  );
}

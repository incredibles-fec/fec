import React from 'react';
import { useSelector } from 'react-redux';
import Outfit from './Outfit.jsx';

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

    console.log('current ', product);
    console.log('TYPE ', typeof product);

    const isFound = outfitList.some((value) => {
      if (value.id === product.id) {
        return true;
      }
      return false;
    });

    if (!isFound) {
      setOutfitList([...outfitList, product]);
    }

    localStorage.setItem(correctProduct[0].id, JSON.stringify({
      category: correctProduct[0].category,
      name: correctProduct[0].name,
      default_price: correctProduct[0].default_price,
      sale_price: correctProduct[0].salePrice,
      image: correctProduct[0].image,
      id: correctProduct[0].id,
    }));
  };

  const onRemoveFromOutfit = (e) => {
    // TODO: Update LOCAL STORAGE REMOVE
    const currentProductName = e.target.id;
    const newList = outfitList.filter((product) => product.name !== currentProductName);
    setOutfitList(newList);
  };

  React.useEffect(() => {
    const newArray = Object.values(localStorage).map((storage) => JSON.parse(storage));
    setOutfitList(newArray);
  }, []);

  return (
    <div className="outfitContainer">
      <h3>Your Outfit</h3>
      <div className="outfitItemContainer">
        <div className="addToOutfit">
          <div className="addToOutfitContainer" onClick={onAddToOutfit}>
            <h1>Add to Outfit</h1>
            <i className="fa-regular fa-plus" />
          </div>
        </div> {outfitList.length > 0 ?
          outfitList.map((item) => (
            <Outfit key={item.id} item={item} onRemoveFromOutfit={onRemoveFromOutfit} list={outfitList} />
          )) : null }
      </div>
    </div>
  );
}

// outfitList.length === Object.values(localStorage).length

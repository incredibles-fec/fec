import React from 'react';
import axios from 'axios';
import Outfit from './Outfit.jsx';

export default function OutfitList() {
  const [outfitList, setOutfitList] = React.useState([]);

  const onAddToOutfit = () => {
    // TODO: connect to product overview section to access current product
    // access the current product
    // sample data for testing
    const sampleItem = {
      id: 4552,
      name: 'Winter Shorts',
      category: 'Outdoor',
      style: 'short',
      size: 'medium',
      price: '$200',
    };

    const isFound = outfitList.some((value) => {
      if (value.style === sampleItem.style) {
        return true;
      }
      return false;
    });

    if (!isFound) {
      setOutfitList([...outfitList, sampleItem]);
    }
    // local storage testing
    // add item to local storage
    localStorage.setItem('44524', JSON.stringify({
      category: 'shorts',
      name: 'tulips'
    }));
  };

  const onRemoveFromOutfit = (e) => {
    const currentProductName = e.target.id;
    const newList = outfitList.filter((product) => product.name !== currentProductName);
    setOutfitList(newList);
  };

  return (
    <div>
      <h3>Your Outfit</h3>
      <div className="outfitItemContainer">
        <div className="addToOutfit">
          <div className="addToOutfitContainer" onClick={onAddToOutfit}>
            <h1>Add to Outfit</h1>
            <i className="fa-regular fa-plus" />
          </div>
        </div> { outfitList.map((item) => (
          <Outfit key={item.id} item={item} onRemoveFromOutfit={onRemoveFromOutfit} />
        ))}
      </div>
    </div>
  );
}

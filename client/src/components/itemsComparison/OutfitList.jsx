import React from 'react';
import axios from 'axios';
import RelatedOutfits from './index.jsx';
import Outfit from './Outfit.jsx';

export default function OutfitList() {
  const [outfitList, setOutfitList] = React.useState([]);

  const onAddToOutfit = () => {
    // TODO: connect to product overview section to access current product
    // access the current product
    // sample data for testing
    const sampleItem = {
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
    console.log('outfitList ', outfitList);
  };

  const onRemoveFromOutfit = () => {
    console.log('clicked');
  };

  return (
    <div>
      <h3>Your Outfit</h3>
      <div className="outfitItemContainer">
        <div className="addToOutfit">
          <div className="addToOutfitContainer" onClick={onAddToOutfit}>
            <h1>Add to Outfit</h1>
            <i className="fa-regular fa-plus"></i>
          </div>
        </div>
        <Outfit onRemoveFromOutfit={onRemoveFromOutfit} />
      </div>
    </div>
  );
};

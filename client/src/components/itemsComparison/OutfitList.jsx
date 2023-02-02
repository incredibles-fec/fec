import React from 'react';
import axios from 'axios';
import RelatedOutfits from './index.jsx';
import Outfit from './Outfit.jsx';

const OutfitList = () => {

  return (
    <div>
      <h3>Your Outfit</h3>
      <div className='outfitItemContainer'>
        <Outfit/>
      </div>
    </div>
  );
};

export default OutfitList;

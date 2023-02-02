import React from 'react';

const Outfit = ({item}) => {
  return (
    <div className='outfitCard'>
      <div className="outfitCardContent">
        <div>Add to Outfit</div>
        <i className="fa-regular fa-plus"></i>
      </div>
    </div>
  );
};

export default Outfit;

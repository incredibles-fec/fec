import React from 'react';

export default function ProductInformation({ styles }) {
  if (styles) {
    const allStyles = styles.map((p) => (
      <img className="style-item" src={p.photos[0].thumbnail_url} alt="" key={p.style_id} />
    ));
    return (
      <div>
        <div className="product-style">Style &gt; Selected Style </div>
        {allStyles}
      </div>
    );
  }
  return (<div>Loading Styles...</div>);
}

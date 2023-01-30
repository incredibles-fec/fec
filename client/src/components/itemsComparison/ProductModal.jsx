import React from 'react';

export default function ProductModal({ visible, onClick }) {
  if (!visible) {
    return null;
  }

  return (
    <div>
      <div className="productModal">
        <h1>Comparing</h1>
        <h2>Modal Subheader</h2>
        <button onClick={onClick} type="button">x</button>
      </div>
    </div>
  );
}

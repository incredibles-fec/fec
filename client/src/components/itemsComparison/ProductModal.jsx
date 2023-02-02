import React from 'react';

export default function ProductModal({ visible, onClick }) {
  if (!visible) {
    return null;
  }

  return (
    <div>
      <div className="productModal">
        <h1>COMPARING</h1>
        <table>
          <thead>
            <th className="leftHeader">Current Product</th>
            <th className="rightHeader">Compared Product</th>
          </thead>
        </table>
        <table className="compareTable">
          <thead>
            <th className="checkLeftHeader" />
            <th className="productInfo" />
            <th className="checkRightHeader" />
          </thead>
          <tr>
            <td className="checkLeft">checkmark</td>
            <td className="productInfo">Sample product information</td>
            <td className="checkRight">checkmark</td>
          </tr>
          <tr>
            <td className="checkLeft">checkmark</td>
            <td className="productInfo">Another detail</td>
            <td className="checkRight">checkmark</td>
          </tr>
        </table>
        <button className="modalExit" onClick={onClick} type="button">
          x
        </button>
      </div>
    </div>
  );
}

/* eslint-disable no-restricted-syntax */
import React from 'react';

export default function ProductModal({
  visible, onClick, currentProduct, item
}) {
  if (!visible) {
    return null;
  }

  const [finalObject, setFinalObject] = React.useState({});

  React.useEffect(() => {
    const sample = {};

    for (const property in currentProduct) {
      if (property !== 'campus' && property !== 'created_at' && property !== 'updated_at' && typeof property !== 'object') {
        sample[property] = [currentProduct[property]];
      }
      if (Array.isArray(currentProduct[property])) {
        currentProduct[property].forEach((detail) => {
          sample[detail.feature] = [detail.value];
        });
      }
    }

    // eslint-disable-next-line guard-for-in
    for (const property in item) {
      if (sample[property] !== undefined && property !== 'campus' && property !== 'created_at' && property !== 'updated_at') {
        sample[property].push(item[property]);
      } else if (property !== 'campus' && property !== 'created_at' && property !== 'updated_at') {
        sample[property] = [item[property]];
      }

      if (Array.isArray(item[property])) {
        item[property].forEach((detail) => {
          if (sample[detail.feature] !== undefined) {
            sample[detail.feature].push(detail.value);
          } else {
            sample[detail.feature] = [detail.value];
          }
        });
      }
    }

    setFinalObject(sample);
  }, []);

  return (
    <div>
      <div className="productModal">
        <h1>COMPARING</h1>
        <button className="modalExit" onClick={onClick} type="button">
          x
        </button>
        <table>
          <thead>
            <tr className="modalHeader">
              <th className="leftHeader">Current Viewed Product</th>
              <th className="rightHeader">Compared Product Card</th>
            </tr>
          </thead>
        </table>
        <table className="compareTable">
          <thead>
            <tr>
              <th className="checkLeftHeader" aria-label="left check header" />
              <th className="productInfo" aria-label="product information" />
              <th className="checkRightHeader" aria-label="right check header" />
            </tr>
            { Object.values(finalObject).length > 0 ?
              Object.keys(finalObject).map((product) => {
                if (product !== 'features' && product !== 'image' && product !== 'slogan' && product !== 'description' && product !== 'price' && product !== 'id' && product !== 'salePrice') {
                  return (
                    <tr>
                      <td>{finalObject[product][0] || '--'}</td>
                      {product === 'default_price' ?
                        <td className="productInfo">Price</td> :
                        <td className="productInfo">{product}</td>}
                      <td>{finalObject[product][1] || '--'}</td>
                    </tr>
                  );
                }
              })
              : null}
          </thead>
        </table>
      </div>
    </div>
  );
}

// <tr>
// <td>{currentProduct.id}</td>
// <td className="productInfo">Product Id</td>
// <td>{item.id}
//   {/* <i className="fa-solid fa-check" /> */}
// </td>
// </tr>
// <tr>
// <td>${currentProduct.default_price}</td>
// <td className="productInfo">Default Price</td>
// <td>{item.default_price}
//   {/* <i className="fa-solid fa-check" /> */}
// </td>
// </tr>

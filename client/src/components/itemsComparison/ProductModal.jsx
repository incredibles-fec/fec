/* eslint-disable no-else-return */
/* eslint-disable guard-for-in */
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
        <h1>PRODUCT COMPARISON</h1>
        <i className="fa-solid fa-square-xmark" onClick={onClick} />
        <table>
          {/* <thead>
            <tr className="modalHeader">
              <th className="leftHeader">Current Viewed Product</th>
              <th className="rightHeader">Compared Product Card</th>
            </tr>
          </thead> */}
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
                if (product === 'name') {
                  return (
                    <tr key={product}>
                      <td className="productNameLeft">{finalObject[product][0] || '--'}</td>
                      <td />
                      <td className="productNameRight">{finalObject[product][1] || '--'}</td>
                    </tr>
                  );
                } else if (product !== 'features' && product !== 'image' && product !== 'slogan' && product !== 'description' && product !== 'price' && product !== 'id' && product !== 'salePrice' && product !=='name') {
                  return (
                    <tr key={product}>
                      <td>{finalObject[product][0] || '--'}</td>
                      {product === 'default_price' ?
                        <td className="productInfo">price</td> :
                        <td className="productInfo">{product.toLowerCase()}</td>}
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

import React from 'react';
import { useSelector } from 'react-redux';

export default function Styles({ currentStyle, setCurrentStyle }) {
  const { currentProductStyles } = useSelector((state) => state.pd);

  const styles = currentProductStyles;

  if (styles) {
    const rows = [...Array(Math.ceil(styles.length / 4))];
    const styleRows = rows.map((row, index) => styles.slice(index * 4, index * 4 + 4));
    const allStyles = styleRows.map((row, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div className="styles-row" key={`row-${index}`}>{row.map((style) => (
        <div className="style-item-overlay" key={style.style_id} onClick={() => setCurrentStyle(style)}>
          <img className="style-item" src={style.photos[0].thumbnail_url} alt={style.name} />
          {currentStyle.style_id === style.style_id && <em className="checkmark"><i className="fa-regular fa-circle-check" /></em>}
        </div>
      ))}
      </div>
    ));

    return (
      <div>
        <div className="product-style">Style &gt; <u><i>{currentStyle.name}</i></u></div>
        {allStyles}
      </div>
    );
  }
  return (<div>Loading Styles...</div>);
}

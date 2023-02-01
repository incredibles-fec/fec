import React from 'react';

export default function Styles({ styles, currentStyle, setCurrentStyle }) {
  if (styles) {
    // const allStyles = styles.map((p, index) => (
    //   <div className="style-item-overlay" key={p.style_id} onClick={() => setCurrentStyle(styles[index])}>
    //     <img className="style-item" src={p.photos[0].thumbnail_url} alt={p.name} />
    //   </div>
    // ));

    const rows = [...Array(Math.ceil(styles.length / 4))];
    const styleRows = rows.map((row, index) => styles.slice(index * 4, index * 4 + 4));
    const allStyles = styleRows.map((row, index) => (
        <div className="styles-row" key={index}>{row.map((style) => (
          <span className="style-item-overlay" key={style.style_id} onClick={() => setCurrentStyle(style)}>
            <img className="style-item" src={style.photos[0].thumbnail_url} alt={style.name} />
          </span>
        ))}
        </div>
    ));
    console.log(rows);
    console.log(styleRows);

    return (
      <div>
        <div className="product-style">Style &gt; {currentStyle.name} </div>
        {allStyles}
      </div>
    );
  }
  return (<div>Loading Styles...</div>);
}

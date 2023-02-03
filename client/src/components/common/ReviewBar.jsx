import React from 'react';
import { radioGroupOptions } from '../../utils/mappings';

export default function ReviewBar({ title, characteristic }) {
  // 94% is max because idk css
  const adjustedPercentage = (characteristic.value / 100) * 94;
  const descriptions = radioGroupOptions.characteristics[title.toLowerCase()];
  const low = descriptions[0].label;
  const medium = descriptions[2].label;
  const high = descriptions[4].label;

  return (
    <div>
      <div>{title}</div>
      <div className="char-bar-container">
        <div className="char-bar" />
        <div className="char-bar" />
        <div className="char-bar" />
        <div
          className="triangle-marker"
          style={{ left: `${adjustedPercentage}%` }}
        >
          <i className="fa-sharp fa-solid fa-caret-down" />
        </div>
      </div>
      <div className="char-bar-container">
        <div className="char-bar-desc">{low}</div>
        <div className="char-bar-desc" style={{ textAlign: 'center' }}>
          {medium}
        </div>
        <div className="char-bar-desc" style={{ justifyContent: 'end' }}>
          {high}
        </div>
      </div>
    </div>
  );
}

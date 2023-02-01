import React from 'react';

export default function ReviewBar() {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '0.3rem',
        gap: '0.4rem',
        position: 'relative',
      }}
    >
      <span style={{ backgroundColor: '#D3D3D3', width: '33%' }} />
      <span style={{ backgroundColor: '#D3D3D3', width: '33%' }} />
      <span style={{ backgroundColor: '#D3D3D3', width: '33%' }} />
      <div className="triangle-marker">
        <i className="fa-sharp fa-solid fa-caret-down" />
      </div>
    </div>
  );
}

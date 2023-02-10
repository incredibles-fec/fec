import React from 'react';

export default function RadioGroup({ name, options, handleInput }) {
  return (
    <div>
      <div style={{ fontSize: '0.9rem' }}>
        <b>{name.charAt(0).toUpperCase() + name.slice(1)}</b>
      </div>
      <div style={{ fontSize: '0.8rem' }}>
        {options.map((option) => (
          <div
            key={option.label}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <input
              name={name}
              className="radio-input-button"
              type="radio"
              value={option.value}
              onChange={handleInput}
            />
            <label>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

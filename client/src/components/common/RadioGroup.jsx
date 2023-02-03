import React from 'react';

export default function RadioGroup({ name, options, handleInput }) {
  return (
    <div>
      <div>
        <b>{name.charAt(0).toUpperCase() + name.slice(1)}</b>
      </div>
      {options.map((option) => (
        <label key={option.label}>
          {option.label}
          <input
            name={name}
            type="radio"
            value={option.value}
            onChange={handleInput}
          />
        </label>
      ))}
    </div>
  );
}

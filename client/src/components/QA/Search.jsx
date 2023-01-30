import React from 'react';

export default function Search() {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS"
      />
      <i className="fa-solid fa-magnifying-glass" />
    </div>
  );
}

import React, { useState } from 'react';
import { filterOptions } from '../../utils/mappings';

export default function SearchFilter({ totalReview }) {
  const [selectedSort, setSelectedSort] = useState('relevant');

  return (
    <div className="filter-search-container">
      <section className="filter-sort">
        <div>
          {totalReview} reviews, sorted by
          <select
            className="select-input"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section className="r-filter-container">
        <input
          className="r-search-input"
          type="text"
          placeholder="SEARCH REVIEWS"
        />
        <i className="fa-solid fa-magnifying-glass" />
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getReviews,
  updateQuery,
  updateSort,
  filterReviews,
} from '../../state/rr';
import { filterOptions } from '../../utils/mappings';
import { debounce } from '../../utils/helpers';

export default function SearchFilter() {
  const dispatch = useDispatch();
  const { sort, totals } = useSelector((store) => store.rr);
  const [selectedSort, setSelectedSort] = useState(sort);

  const handleFilter = async (e) => {
    const sortOption = e.target.value;
    setSelectedSort(sortOption);
    dispatch(updateSort(sortOption));
    dispatch(getReviews());
  };

  const handleInput = (e) => {
    const filter = debounce(() => {
      dispatch(updateQuery(e.target.value));
      dispatch(filterReviews());
    }, 500);
    filter();
  };

  return (
    <div className="filter-search-container">
      <section className="filter-sort">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {totals?.totalReviews} reviews, sorted by
          <select
            className="select-input"
            value={selectedSort}
            onChange={handleFilter}
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
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
          onChange={handleInput}
        />
        <i className="fa-solid fa-magnifying-glass" />
      </section>
    </div>
  );
}

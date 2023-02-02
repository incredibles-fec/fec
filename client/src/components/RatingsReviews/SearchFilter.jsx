import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getReviews,
  updateQuery,
  updateSort,
  filterQuestions,
} from '../../state/rr';
import { filterOptions } from '../../utils/mappings';
import { debounce } from '../../utils/helpers';

export default function SearchFilter({ totalReview }) {
  const dispatch = useDispatch();
  const { sort } = useSelector((store) => store.rr);
  const [selectedSort, setSelectedSort] = useState(sort);
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    const filter = debounce(() => {
      dispatch(updateQuery(query));
      dispatch(filterQuestions());
    }, 500);
    filter();
  };

  const handleFilter = async (e) => {
    const sortOption = e.target.value;
    setSelectedSort(sortOption);
    dispatch(updateSort(sortOption));
    dispatch(getReviews());
  };

  useEffect(() => {
    if (query.length >= 3 || !query.length) handleSearch();
  }, [query]);

  return (
    <div className="filter-search-container">
      <section className="filter-sort">
        <div>
          {totalReview} reviews, sorted by
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
          onChange={(e) => setQuery(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass" onClick={handleSearch} />
      </section>
    </div>
  );
}

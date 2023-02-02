import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterQuestions, updateQuery } from '../../state/qa';
import { debounce } from '../../utils/helpers';

export default function Search() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    const filter = debounce(() => {
      dispatch(updateQuery(query));
      dispatch(filterQuestions());
    });
    filter();
  };

  useEffect(() => {
    if (query.length >= 3 || !query.length) handleSearch();
  }, [query]);

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS"
        onChange={(e) => setQuery(e.target.value)}
      />
      <i className="fa-solid fa-magnifying-glass" onClick={handleSearch} />
    </div>
  );
}

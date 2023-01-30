import React from 'react';
import QAList from './QAList.jsx';
import Search from './Search.jsx';

export default function QA() {
  return (
    <div className="qa-container">
      <Search />
      <QAList />
    </div>
  );
}

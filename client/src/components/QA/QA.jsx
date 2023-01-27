import React from 'react';
import QAList from './QAList.jsx';
import QAListEntry from './QAListEntry.jsx';
import Search from './Search.jsx';
import Modal from '../common/Modal.jsx';

const QA = () => (
  <div>
    <QAList />
    <QAListEntry />
    <Search />
    <Modal />
  </div>
);

export default QA;

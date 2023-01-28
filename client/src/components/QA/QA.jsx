import React from 'react';
// redux import test, useSelector allows us to access state
import { useSelector, useDispatch } from 'react-redux';
import { questionFunc, getQA } from '../../state/qa';
import QAList from './QAList.jsx';
import QAListEntry from './QAListEntry.jsx';
import Search from './Search.jsx';
import Modal from '../common/Modal.jsx';

const QA = () => {
  // declare dispatch
  const dispatch = useDispatch();
  // accesses the store's qaReducer
  // const { questions, isLoading } = useSelector((store) => store.qa);

  // invokes async function to populate state
  // useEffect(() => {
  //   dispatch(getQA);
  // }, []);

  return (
    <div>
      <button onClick={() => dispatch(questionFunc())}>Test redux</button>
      <QAList />
      <QAListEntry />
      <Search />
      <Modal />
    </div>
  );
};

export default QA;

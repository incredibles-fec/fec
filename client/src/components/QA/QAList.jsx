import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQA } from '../../state/qa';
import QAListEntry from './QAListEntry.jsx';
import Modal from '../common/Modal.jsx';
import QuestionForm from './QuestionForm.jsx';

const QAList = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((store) => store.qa);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(getQA());
  }, []);
  return (
    <>
      <div>
        {questions.map((q, idx) => (
          <QAListEntry key={idx} questions={q} />
        ))}
      </div>
      <button onClick={() => setIsOpen(true)}>Add a question</button>
      {isOpen && (
        <Modal close={() => setIsOpen(false)}>
          <QuestionForm />
        </Modal>
      )}
    </>
  );
};

export default QAList;

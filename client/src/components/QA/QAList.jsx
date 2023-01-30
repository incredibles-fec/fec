import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQA, loadMoreQuestions } from '../../state/qa';
import QAListEntry from './QAListEntry.jsx';
import Modal from '../common/Modal.jsx';
import Accordion from '../common/Accordion.jsx';
import AddQAForm from './AddQAForm.jsx';

export default function QAList() {
  const dispatch = useDispatch();
  const { questions, fullQuestions } = useSelector((store) => store.qa);
  const [isOpen, setIsOpen] = useState(false);

  const loadMore = () => {
    dispatch(loadMoreQuestions());
  };

  useEffect(() => {
    dispatch(getQA());
  }, []);

  return (
    <div>
      <div>
        <h5>QUESTIONS & ANSWERS</h5>

        <Accordion>
          {questions.map((q) => (
            <QAListEntry key={q.question_id} question={q} />
          ))}
        </Accordion>
      </div>

      {fullQuestions.length > 4 && questions.length < 6 && (
        <button type="button" onClick={() => loadMore()}>
          More Answered Questions
        </button>
      )}
      <button
        className="add-question"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Add a question
      </button>
      {isOpen && (
        <Modal close={() => setIsOpen(false)}>
          <AddQAForm />
        </Modal>
      )}
    </div>
  );
}

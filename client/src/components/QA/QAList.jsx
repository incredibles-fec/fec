import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQA } from '../../state/qa';
import QAListEntry from './QAListEntry.jsx';
import Modal from '../common/Modal.jsx';
import Accordion from '../common/Accordion.jsx';
import AddQAForm from './AddQAForm.jsx';

const QAList = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((store) => store.qa);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    dispatch(getQA());
  }, []);
  return (
    <>
      <div>
        <h5>QUESTIONS & ANSWERS</h5>

        <Accordion>
          {questions.map((q, idx) => (
            <QAListEntry key={idx} question={q} />
          ))}
        </Accordion>
      </div>

      {questions.length > 4 && <button>More Answered Questions</button>}
      <button onClick={() => setIsOpen(true)}>Add a question</button>
      {isOpen && (
        <Modal close={() => setIsOpen(false)}>
          <AddQAForm />
        </Modal>
      )}
    </>
  );
};

export default QAList;

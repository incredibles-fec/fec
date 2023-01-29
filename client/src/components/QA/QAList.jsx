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
        {questions.map((q, idx) => (
          <Accordion key={idx}>
            <QAListEntry questions={q} />
          </Accordion>
        ))}
      </div>
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

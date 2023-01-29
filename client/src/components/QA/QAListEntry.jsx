import { useState } from 'react';
import Modal from '../common/Modal.jsx';
import AddQAForm from './AddQAForm.jsx';

const QAListEntry = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="question-header">
        <div className="question-title">
          <div>Q: </div>
          <div>{question.question_body}</div>
        </div>
        <div className="question-info">
          <div>
            Helpful? <button className="button-trans">Yes</button> (
            {question.question_helpfulness})
          </div>
          <button className="button-trans" onClick={() => setIsOpen(true)}>
            Add Answer
          </button>
        </div>
      </div>

      {isOpen && (
        <Modal close={() => setIsOpen(false)}>
          <AddQAForm type="answer" question={question.question_body} />
        </Modal>
      )}
    </div>
  );
};
export default QAListEntry;

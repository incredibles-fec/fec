import { useState } from 'react';
import Modal from '../common/Modal.jsx';
import AddQAForm from './AddQAForm.jsx';
import AnswerEntry from './AnswerEntry.jsx';

const QAListEntry = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {/* Header */}
      <div className="q-container">
        <div style={{ width: '2%' }}>Q: </div>
        <div className="q-header">
          <div className="q-body">{question.question_body}</div>
          {/* Right header section */}
          <div className="q-info">
            <div className="q-helpful">
              Helpful? <button className="button-trans">Yes</button> (
              {question.question_helpfulness})
            </div>
            <div className="q-addA">
              <button className="button-trans" onClick={() => setIsOpen(true)}>
                Add Answer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Section */}
      {Object.values(question.answers).map((answer, idx) => (
        <AnswerEntry key={idx} answer={answer} />
      ))}

      {Object.values(question.answers).length > 2 && (
        <div>
          <button>LOAD MORE ANSWERS</button>
        </div>
      )}

      {isOpen && (
        <Modal close={() => setIsOpen(false)}>
          <AddQAForm type="answer" question={question.question_body} />
        </Modal>
      )}
    </div>
  );
};
export default QAListEntry;

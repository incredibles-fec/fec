import { useState } from 'react';
import Modal from '../common/Modal.jsx';
import AddQAForm from './AddQAForm.jsx';
import AnswerEntry from './AnswerEntry.jsx';
import { markQuestionHelpful, reportQuestion } from '../../api/qa';

const QAListEntry = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);

  const answers = Object.keys(question.answers)
    .map((questionId) => ({
      questionId,
      ...question.answers[questionId],
    }))
    .sort((a, b) => b.helpfulness - a.helpfulness);

  const [isMarked, setIsMarked] = useState(false);
  const [isReported, setIsReported] = useState(false);

  const actionHandler = async (type = 'mark') => {
    if (type === 'report') {
      if (isReported) return;
      const res = await reportQuestion(question.question_id);
      setIsReported(true);
    } else {
      if (isMarked) return;
      const res = await markQuestionHelpful(question.question_id);
      setIsMarked(true);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="q-user">
        <div>Username: {question.asker_name}</div>
        <button onClick={() => setIsOpen(true)}>Add Answer</button>
      </div>

      <div className="q-container">
        <div style={{ width: '2%' }}>Q: </div>
        <div className="q-header">
          <div className="q-body">{question.question_body}</div>
          {/* Right header section */}
          <div className="q-info">
            <div className="q-helpful">
              Helpful?
              <button
                className="button-trans"
                disabled={isMarked}
                onClick={() => actionHandler()}
              >
                Yes
              </button>{' '}
              ({question.question_helpfulness})
            </div>
            <div className="q-addA">
              <button
                className="button-trans"
                disabled={isReported}
                onClick={() => actionHandler('report')}
              >
                {isReported ? 'Reported' : 'Report'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Section */}
      {answers.map((answer, idx) => (
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
      <hr></hr>
    </div>
  );
};
export default QAListEntry;

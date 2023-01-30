import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadMoreAnswers } from '../../state/qa';
import Modal from '../common/Modal.jsx';
import AddQAForm from './AddQAForm.jsx';
import AnswerEntry from './AnswerEntry.jsx';
import { markQuestionHelpful, reportQuestion } from '../../api/qa';

export default function QAListEntry({ question }) {
  const dispatch = useDispatch();
  const { questions } = useSelector((store) => store.qa);
  const [isOpen, setIsOpen] = useState(false);

  const answerCount = questions.find(
    (q) => q.question_id === question.question_id
  )?.answer_count;

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
      await reportQuestion(question.question_id);
      setIsReported(true);
    } else {
      if (isMarked) return;
      await markQuestionHelpful(question.question_id);
      setIsMarked(true);
    }
  };

  const loadMore = () => {
    dispatch(loadMoreAnswers(question.question_id));
  };

  return (
    <div>
      {/* Header */}
      <div className="q-user">
        <div>Username: {question.asker_name}</div>
        <button type="button" onClick={() => setIsOpen(true)}>
          Add Answer
        </button>
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
                type="button"
                disabled={isMarked}
                onClick={() => actionHandler()}
              >
                Yes
              </button>
              ({question.question_helpfulness})
            </div>
            <div className="q-addA">
              <button
                className="button-trans"
                type="button"
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
      {answers.slice(0, answerCount).map((answer) => (
        <AnswerEntry key={answer.questionId} answer={answer} />
      ))}

      {Object.values(question.answers).length > 2 && answerCount < 4 && (
        <div>
          <button type="button" onClick={loadMore}>
            LOAD MORE ANSWERS
          </button>
        </div>
      )}

      {isOpen && (
        <Modal close={() => setIsOpen(false)}>
          <AddQAForm
            type="answer"
            question={question.question_body}
            questionId={question.question_id}
          />
        </Modal>
      )}
      <hr />
    </div>
  );
}

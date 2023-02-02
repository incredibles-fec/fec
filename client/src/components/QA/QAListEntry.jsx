import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadMoreAnswers } from '../../state/qa';
import Modal from '../common/Modal.jsx';
import AddQAForm from './AddQAForm.jsx';
import AnswerEntry from './AnswerEntry.jsx';
import { markQuestionHelpful, reportQuestion } from '../../api/qa';

export default function QAListEntry({ question }) {
  const dispatch = useDispatch();
  const { questions, query } = useSelector((store) => store.qa);
  const [isOpen, setIsOpen] = useState(false);
  const [canLoad, setCanLoad] = useState(true);

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
    if (answerCount >= Object.values(question.answers).length) {
      setCanLoad(false);
    }

    dispatch(loadMoreAnswers(question.question_id));
  };

  const searchHighlight = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, idx) => {
          const key = idx + 1;
          if (part.toLowerCase() === highlight.toLowerCase()) {
            return <b key={key}>{part}</b>;
          }
          return part;
        })}
      </span>
    );
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
          <div className="q-body">
            {searchHighlight(question.question_body, query)}
          </div>
          {/* Right header section */}
          <div className="q-info">
            <div>
              <span style={{ marginRight: '5px' }}>Helpful?</span>
              <button
                className="button-trans"
                style={{ marginRight: '5px' }}
                type="button"
                disabled={isMarked}
                onClick={() => actionHandler()}
              >
                Yes
              </button>
              (
              {isMarked
                ? question.question_helpfulness + 1
                : question.question_helpfulness}
              ) ┃
            </div>
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

      {/* Answer Section */}
      {/* TODO: Infinite scroll with answers */}
      {answers.slice(0, answerCount).map((answer) => (
        <AnswerEntry key={answer.questionId} answer={answer} />
      ))}

      {Object.values(question.answers).length > 2 && canLoad && (
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
            close={() => setIsOpen(false)}
          />
        </Modal>
      )}
      <hr />
    </div>
  );
}

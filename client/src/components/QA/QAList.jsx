import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQA, loadMoreQuestions } from '../../state/qa';
import { debounce } from '../../utils/helpers';
import QAListEntry from './QAListEntry.jsx';
import Modal from '../common/Modal.jsx';
import Accordion from '../common/Accordion.jsx';
import AddQAForm from './AddQAForm.jsx';

export default function QAList() {
  const dispatch = useDispatch();
  const { questions, fullQuestions, isLoading } = useSelector(
    (store) => store.qa
  );
  const [isOpen, setIsOpen] = useState(false);
  const [scrollToLoad, setScrollToLoad] = useState(false);

  const loadMore = () => {
    dispatch(loadMoreQuestions());
    setScrollToLoad(true);
  };

  const ref = useRef();
  const onScrollLoad = useCallback((node) => {
    if (ref.current) ref.current.disconnect();
    ref.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // TODO: Do fetch if again if not enough questions left
        const load = debounce(() => {
          dispatch(loadMoreQuestions());
        });
        load();
      }
    });
    if (node) ref.current.observe(node);
  }, []);

  useEffect(() => {
    dispatch(getQA());
  }, []);

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        {!isLoading && !fullQuestions.length && (
          <button
            className="add-question"
            type="button"
            onClick={() => setIsOpen(true)}
          >
            Add a question
          </button>
        )}
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Accordion
          title="Question & Answers"
          isCollapsed={fullQuestions.length > 0}
        >
          {questions.map((q, idx) => (
            <div
              key={q.question_id}
              ref={
                idx === questions.length - 1 && scrollToLoad
                  ? onScrollLoad
                  : null
              }
            >
              <QAListEntry question={q} />
            </div>
          ))}
        </Accordion>
      </div>

      {fullQuestions.length > 4 && questions.length < 6 && (
        <button
          style={{ marginRight: '5px' }}
          type="button"
          onClick={() => loadMore()}
        >
          More Answered Questions
        </button>
      )}
      {fullQuestions.length > 0 && (
        <button
          className="add-question"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          Add a question
        </button>
      )}

      {isOpen && (
        <Modal close={() => setIsOpen(false)}>
          <AddQAForm close={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

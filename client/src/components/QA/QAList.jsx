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
      <div style={{ marginTop: '1rem' }}>
        {!scrollToLoad && fullQuestions.length > 2 && (
          <button
            style={{ marginRight: '5px' }}
            type="button"
            className="list-action-buttons"
            onClick={() => loadMore()}
          >
            More Answered Questions
          </button>
        )}
        {fullQuestions.length > 0 && (
          <button
            className="list-action-buttons"
            type="button"
            onClick={() => setIsOpen(true)}
          >
            Add a question
          </button>
        )}
      </div>

      {isOpen && (
        <Modal close={() => setIsOpen(false)}>
          <AddQAForm close={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

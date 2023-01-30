import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQA, loadMoreQuestions } from '../../state/qa';
import { debounce } from '../../utils/qaHelpers';
import QAListEntry from './QAListEntry.jsx';
import Modal from '../common/Modal.jsx';
import Accordion from '../common/Accordion.jsx';
import AddQAForm from './AddQAForm.jsx';

export default function QAList() {
  const dispatch = useDispatch();
  const { questions, fullQuestions } = useSelector((store) => store.qa);
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
        // need to setTimeOut
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
      <div>
        <h5>QUESTIONS & ANSWERS</h5>

        <Accordion>
          {questions.map((q, idx) => {
            if (idx === questions.length - 1 && scrollToLoad) {
              return (
                <div key={q.question_id} ref={onScrollLoad}>
                  <QAListEntry question={q} />
                </div>
              );
            }
            return <QAListEntry key={q.question_id} question={q} />;
          })}
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
          <AddQAForm close={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

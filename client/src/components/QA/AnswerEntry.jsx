import React, { useState } from 'react';
import Modal from '../common/Modal.jsx';
import { transformDate } from '../../utils/helpers';
import { markAnswerHelpful, reportAnswer } from '../../api/qa';

export default function AnswerEntry({ answer }) {
  const [isMarked, setIsMarked] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const actionHandler = async (type = 'mark') => {
    if (type === 'report') {
      if (isReported) return;
      await reportAnswer(answer.id);
      setIsReported(true);
    } else {
      if (isMarked) return;
      await markAnswerHelpful(answer.id);
      setIsMarked(true);
    }
  };

  const openPhoto = (src) => {
    setCurrentPhoto(src);
    setIsOpen(true);
  };

  return (
    <div className="a-container">
      <div>{answer.body}</div>
      <div className="a-photos">
        {answer.photos.map((photo) => (
          <div
            key={photo}
            style={{ cursor: 'pointer' }}
            onClick={() => openPhoto(photo)}
          >
            <img alt="user uploaded" src={photo} />
          </div>
        ))}
      </div>
      <div className="a-footer">
        <div style={{ marginRight: '5px' }}>
          by {answer.answerer_name}, {transformDate(answer.date)}
        </div>
        <div style={{ marginRight: '5px' }}>
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
          ({isMarked ? answer.helpfulness + 1 : answer.helpfulness}) ┃
        </div>
        <div>
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

      {isOpen && (
        <Modal close={() => setIsOpen(false)}>
          <div>
            <img
              className="photo-style"
              alt="user uploaded"
              src={currentPhoto}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

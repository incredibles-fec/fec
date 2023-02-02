import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../common/Modal.jsx';
import { transformDate } from '../../utils/helpers';
import { markAnswerHelpful, reportAnswer } from '../../api/qa';

export default function AnswerEntry({ answer }) {
  const [isMarked, setIsMarked] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { query } = useSelector((store) => store.qa);
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
    <div className="a-container">
      <div>{searchHighlight(answer.body, query)}</div>
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

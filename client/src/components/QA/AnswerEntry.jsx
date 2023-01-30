import React, { useState } from 'react';
import { transformDate } from '../../utils/qaHelpers';
import { markAnswerHelpful, reportAnswer } from '../../api/qa';

export default function AnswerEntry({ answer }) {
  const [isMarked, setIsMarked] = useState();
  const [isReported, setIsReported] = useState();
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

  return (
    <div className="a-container">
      <div>{answer.body}</div>
      <div className="a-photos">
        {answer.photos.map((photo) => (
          <img key={photo} alt="user uploaded" src={photo} />
        ))}
      </div>
      <div className="a-footer">
        <div className="a-info">
          by
          {answer.answerer_name}, {transformDate(answer.date)}
        </div>
        <div className="a-helpful">
          Helpful?
          <button
            className="button-trans"
            type="button"
            disabled={isMarked}
            onClick={() => actionHandler()}
          >
            Yes
          </button>
          ({answer.helpfulness})
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
    </div>
  );
}

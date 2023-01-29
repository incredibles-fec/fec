import { transformDate } from '../../utils/qaHelpers.js';

const AnswerEntry = ({ answer }) => (
  <div className="a-container">
    <div>{answer.body}</div>
    <div className="a-footer">
      <div className="a-info">
        by {answer.answerer_name}, {transformDate(answer.date)}
      </div>
      <div className="a-helpful">
        Helpful? <button className="button-trans">Yes</button> (
        {answer.helpfulness})
      </div>
      <div>
        <button className="button-trans">Report</button>
      </div>
    </div>
  </div>
);
export default AnswerEntry;

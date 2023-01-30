import axios from 'axios';

const markQuestionHelpful = async (questionId) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `/qa/questions/${questionId}/helpful`,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const markAnswerHelpful = async (answerId) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `/qa/answers/${answerId}/helpful`,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const reportQuestion = async (questionId) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `/qa/questions/${questionId}/report`,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const reportAnswer = async (answerId) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `/qa/answers/${answerId}/report`,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export { markQuestionHelpful, markAnswerHelpful, reportQuestion, reportAnswer };

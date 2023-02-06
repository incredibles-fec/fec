import axios from 'axios';
import { uploadCloudinary } from './apiHelpers';

// TODO: Toast and Loading component
const submitForm = async ({ form, type, questionId, files }) => {
  const routes = {
    question: '/qa/questions',
    answer: `/qa/questions/${questionId}/answers`,
  };

  // TODO: CHANGE THIS TO DYNAMIC PRODUCT_ID
  const questionParams = { ...form, product_id: 40355 };
  let photos = [];
  if (type === 'answer' && files.length) {
    const res = await uploadCloudinary(files);
    photos = res.map((upload) => upload.data.url);
  }

  const params = {
    ...form,
    photos,
  };

  return axios({
    method: 'POST',
    url: routes[type],
    data: type === 'question' ? questionParams : params,
  });
};

const markQuestionHelpful = (questionId) =>
  axios({
    method: 'PUT',
    url: `/qa/questions/${questionId}/helpful`,
  });

const markAnswerHelpful = (answerId) =>
  axios({
    method: 'PUT',
    url: `/qa/answers/${answerId}/helpful`,
  });

const reportQuestion = (questionId) =>
  axios({
    method: 'PUT',
    url: `/qa/questions/${questionId}/report`,
  });

const reportAnswer = (answerId) =>
  axios({
    method: 'PUT',
    url: `/qa/answers/${answerId}/report`,
  });

export {
  submitForm,
  markQuestionHelpful,
  markAnswerHelpful,
  reportQuestion,
  reportAnswer,
};

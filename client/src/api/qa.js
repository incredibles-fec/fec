import axios from 'axios';

const uploadCloudinary = (files) => {
  const uploads = [];
  for (let i = 0; i < files.length; i += 1) {
    const formData = new FormData();
    formData.append('file', files[i]);
    formData.append('upload_preset', 'q6mobdff');
    uploads.push(
      axios.post(
        'https://api.cloudinary.com/v1_1/dpwqi5o83/image/upload',
        formData
      )
    );
  }
  return Promise.all(uploads);
};

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
  try {
    const res = await axios({
      method: 'POST',
      url: routes[type],
      data: type === 'question' ? questionParams : params,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

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

export {
  submitForm,
  markQuestionHelpful,
  markAnswerHelpful,
  reportQuestion,
  reportAnswer,
};

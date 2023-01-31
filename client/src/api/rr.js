import axios from 'axios';

const markHelpfulReview = async (reviewId) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `/reviews/${reviewId}/helpful`,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const reportReview = async (reviewId) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `/reviews/${reviewId}/report`,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export { markHelpfulReview, reportReview };

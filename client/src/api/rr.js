import axios from 'axios';

const submitForm = async (form, productId = 40355) => {
  const {
    size,
    width,
    comfort,
    quality,
    length,
    fit,
    recommend,
    ...otherParams
  } = form;
  const params = {
    ...otherParams,
    product_id: productId,
    recommend: recommend === 'yes',
    characteristics: {
      14: Number(size),
      15: Number(width),
      16: Number(comfort),
      17: Number(quality),
      18: Number(length),
      19: Number(fit),
    },
  };
  // TODO: THIS IS NOT WORKING DUE TO INVALID ENTRIES???????
  try {
    const res = await axios({
      method: 'POST',
      url: '/reviews',
      data: params,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

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

export { submitForm, markHelpfulReview, reportReview };

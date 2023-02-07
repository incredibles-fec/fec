import axios from 'axios';
import { uploadCloudinary } from './apiHelpers';

const submitForm = async (form, productId, files) => {
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

  let photos = [];
  if (files.length) {
    const res = await uploadCloudinary(files);
    photos = res.map((upload) => upload.data.url);
  }

  // characteristics doesn't work
  const params = {
    ...otherParams,
    product_id: productId,
    recommend: recommend === 'yes',
    characteristics: {},
    // characteristics: {
    //   14: Number(size),
    //   15: Number(width),
    //   16: Number(comfort),
    //   17: Number(quality),
    //   18: Number(length),
    //   19: Number(fit),
    // },
    photos,
  };

  return axios({
    method: 'POST',
    url: '/reviews',
    data: params,
  });
};

const markHelpfulReview = (reviewId) =>
  axios({
    method: 'PUT',
    url: `/reviews/${reviewId}/helpful`,
  });

const reportReview = (reviewId) =>
  axios({
    method: 'PUT',
    url: `/reviews/${reviewId}/report`,
  });

export { submitForm, markHelpfulReview, reportReview };

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
    photos,
  };

  try {
    const res = await axios({
      method: 'POST',
      url: '/reviews',
      data: params,
    });
    return res;
  } catch (err) {
    console.log('Post shows error message but ignore it, because api sucks');
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

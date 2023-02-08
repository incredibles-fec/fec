import axios from 'axios';
import { uploadCloudinary } from './apiHelpers';

const submitForm = async (form, productId, files, metaChars) => {
  const { rating, summary, body, recommend, name, email, ...characteristics } =
    form;

  let photos = [];
  if (files.length) {
    const res = await uploadCloudinary(files);
    photos = res.map((upload) => upload.data.url);
  }

  const charsWithIds = {};
  Object.entries(characteristics).forEach(([char, val1]) => {
    const found = Object.entries(metaChars).find(
      ([key]) => key.toLowerCase() === char
    );
    const charId = found?.[1]?.id;
    charsWithIds[charId] = Number(val1);
  });

  const params = {
    product_id: productId,
    rating,
    summary,
    body,
    name,
    email,
    recommend: recommend === 'yes',
    characteristics: charsWithIds,
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

const axios = require('axios');

const atelierRequest = async ({
  params = {},
  data = {},
  method = 'GET',
  path = '',
  } = {}) => {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${path}`,
    method: method,
    headers: {
      'content-type': 'application/json',
      Authorization: `${process.env.GITHUB_TOKEN ?? ''}`,
    },
    params: params,
    data: data,
  };

  try {
    const res = await axios(options);
    return res;
  } catch (error) {
    console.log('ERR ', error);
    return error;
  }
};

module.exports.atelierRequest = atelierRequest;

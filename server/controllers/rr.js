const { atelierRequest } = require('../lib/atelier');

module.exports = {
  // TODO change product_id to dynamic
  getReviews: async (req, res) => {
    const { sort, product_id } = req.body;
    try {
      const reviews = await atelierRequest({
        params: {
          product_id: product_id ?? 40355,
          sort: sort ?? 'newest',
          page: 1,
          count: 10,
        },
        path: req.url,
      });
      res.status(200).send(reviews.data);
    } catch (err) {
      res.status(400).send({ message: 'Error requesting reviews' });
    }
  },
  getReviewMeta: async (req, res) => {
    try {
      const metaData = await atelierRequest({
        params: {
          product_id: req.body.productId,
        },
        path: req.url,
      });
      res.status(200).send(metaData.data);
    } catch (err) {
      res.status(400).send({ message: 'Error requesting reviews' });
    }
  },
  postReview: async (req, res) => {
    try {
      const posted = await atelierRequest({
        method: 'POST',
        data: req.body,
        path: req.url,
      });
      if (posted.data !== 'Created') throw Error('Error posting review');
      res.status(201).send({ message: 'Successfully posted review' });
    } catch (err) {
      res.status(400).send({ message: err });
    }
  },
  markHelpfulReview: async (req, res) => {
    try {
      await atelierRequest({
        method: 'PUT',
        path: req.url,
      });
      res
        .status(203)
        .send({ message: 'Successfully marked review as helpful' });
    } catch (err) {
      res.status(400).send({ message: err });
    }
  },
  reportReview: async (req, res) => {
    try {
      await atelierRequest({
        method: 'PUT',
        path: req.url,
      });
      res.status(203).send({ message: 'Successfully reported review' });
    } catch (err) {
      res.status(400).send({ message: err });
    }
  },
};

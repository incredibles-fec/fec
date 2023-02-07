const { atelierRequest } = require('../lib/atelier.js');

module.exports = {
  getCart: async(req, res) => {
    try {
      const cart = await atelierRequest({
        path: req.url
      });
      res.status(201).send('Got the cart');
    } catch (err) {
      res.status(400).send({ message: 'Could not get cart', error: err});
    }
  },
  postToCart: async (req, res) => {
    try {
      const posted = await atelierRequest({
        method: 'POST',
        path: req.url,
        data: req.body
      });
      if (posted.data) {
        res.status(201).send('Add to cart successful');
      } else {
        throw Error('Internal Server error');
      }
    } catch (err) {
      res.status(400).send({ message: 'Error adding to cart', error: err.response });
    }
  },
  getProducts: async (req, res) => {
    try {
      const products = await atelierRequest({
        params: { page: 1, count: 10 },
        path: req.url
      });
      res.status(200).send(products.data);
    } catch (err) {
      res.status(400).send({ message: 'Error requesting products', error: err });
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await atelierRequest({
        path: req.url
      });
      if (product.data) {
        res.status(200).send(product.data);
      } else {
        res.status(400).send({ message: 'Product does not exist' });
      }
    } catch (err) {
      res.status(400).send({ message: 'Error requesting the product', error: err });
    }
  },
  getStyles: async (req, res) => {
    try {
      const styles = await atelierRequest({
        path: req.url
      });
      res.status(200).send(styles.data);
    } catch (err) {
      res.status(400).send({ message: 'Error requesting styles', error: err });
    }
  }
};

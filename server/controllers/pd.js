const { atelierRequest } = require('../lib/atelier.js');

module.exports = {
  getProducts: async (req, res) => {
    try {
      const products = await atelierRequest({
        params: {page: 1, count: 5}, //default page & count
        path: req.url
      });
      res.status(200).send(products.data);
    } catch (err) {
      res.status(400).send({message: 'Error requesting products', error: err});
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
        res.status(400).send({message: 'Product does not exist'});
      }
    } catch (err) {
      res.status(400).send({message: 'Error requesting the product', error: err});
    }
  },
  getStyles: async (req, res) => {
    try {
      const styles = await atelierRequest({
        path: req.url
      });
      res.status(200).send(styles.data);
    } catch (err) {
      res.status(400).send({message: 'Error requesting styles', error: err});
    }
  }
};
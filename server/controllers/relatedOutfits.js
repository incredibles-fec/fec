const { atelierRequest } = require('../lib/atelier');

module.exports = {
  getProducts: (req, res) => {
    res.send('hello from products');
  }
};

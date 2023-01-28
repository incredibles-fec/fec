const { atelierRequest } = require('../lib/atelier');

module.exports = {
  getProducts: async (req, res) => {
    try {
      let APIresponse = await atelierRequest ({
        params: {page: 1, count: 6},
        path: req.url,
      });
      res.send(APIresponse.data);
    } catch {
      res.send(400);
    }
  },
  getProductInfo: async (req, res) => {
    try {
      let APIresponse = await atelierRequest ({
        params: {product_id: req.params.product_id},
        path: req.url,
      });
      res.send(APIresponse.data);
    } catch {
      res.send(400);
    }
  },
  getProductStyle: async (req, res) => {
    try {
      let APIresponse = await atelierRequest ({
        params: {product_id: req.params.product_id},
        path: req.url,
      });
      res.send(APIresponse.data);
    } catch {
      res.send(400);
    }
  }
};

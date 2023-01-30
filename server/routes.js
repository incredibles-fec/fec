const router = require('express').Router();
const controller = require('./controllers');

// ProductDetail Routes
router.get('/products', controller.pd.getProducts);
router.get('/products/:product_id', controller.pd.getProduct);
router.get('/products/:product_id/styles', controller.pd.getStyles);

// QA
router.get('/qa/questions', controller.qa.getQuestions);
router.get('/qa/questions/:question_id/answers', controller.qa.getAnswers);
router.post('/qa/questions', controller.qa.postQuestions);
router.post('/qa/questions/:question_id/answers', controller.qa.addAnswer);
router.put(
  '/qa/questions/:question_id/helpful',
  controller.qa.markHelpfulQuestion
);
router.put('/qa/questions/:question_id/report', controller.qa.reportQuestion);
router.put('/qa/answers/:answer_id/helpful', controller.qa.markHelpfulAnswer);
router.put('/qa/answers/:answer_id/report', controller.qa.reportAnswer);

// related products and outfits
router.get('/products', controller.ro.getProducts);
router.get('/products/:product_id', controller.ro.getProductInfo);
router.get('/products/:product_id/styles', controller.ro.getProductStyle);
router.get('/products/:product_id/related', controller.ro.getProductsRelated);

// Ratings & Reviews
router.get('/reviews', controller.rr.getReviews);
router.get('/reviews/meta', controller.rr.getReviewMeta);
router.post('/reviews', controller.rr.postReview);
router.put('/reviews/:review_id/helpful', controller.rr.markHelpfulReview);
router.put('/reviews/:review_id/report', controller.rr.reportReview);

module.exports = router;

const controller = require('./controllers')
const router = require('express').Router()

// QA
router.get('/qa/questions', controller.qa.getQuestions)
router.get('qa/questions/:question_id/answers', controller.qa.getAnswers)
router.post('/qa/questions', controller.qa.postQuestions)
router.post('/qa/questions/:question_id/answers', controller.qa.addAnswer)
router.put('/qa/questions/:question_id/helpful', controller.qa.markHelpfulQuestion)
router.put('/qa/questions/:question_id/report', controller.qa.reportQuestion)
router.put('/qa/answers/:answer_id/helpful', controller.qa.markHelpfulAnswer)
router.put('/qa/answers/:answer_id/report', controller.qa.reportAnswer)


module.exports = router
const { atelierRequest } = require('../lib/atelier');

module.exports = {
  getQuestions: async (req, res) => {
    try {
      const questions = await atelierRequest({
        params: { product_id: 40352, count: 30 },
        path: req.url,
      });
      res.status(200).send(questions.data);
    } catch (err) {
      res.status(400).send({ message: 'Error requesting questions' });
    }
  },
  getAnswers: async (req, res) => {
    try {
      const answers = await atelierRequest({
        params: { count: 20 },
        path: req.url,
      });

      res.status(200).send(answers.data);
    } catch (err) {
      res.status(400).send({ message: 'Error requesting answers' });
    }
  },
  postQuestions: async (req, res) => {
    try {
      const posted = await atelierRequest({
        method: 'POST',
        data: req.body,
        path: req.url,
      });

      if (posted.data !== 'Created') throw Error('Error posting question');
      res.status(201).send({ message: 'Successfully posted question' });
    } catch (err) {
      res.status(400).send({ message: err });
    }
  },
  addAnswer: async (req, res) => {
    try {
      const posted = await atelierRequest({
        method: 'POST',
        data: req.body,
        path: req.url,
      });
      if (posted.data !== 'Created') throw Error('Error posting answer');
      res.status(201).send({ message: 'Successfully posted answer' });
    } catch (err) {
      res.status(400).send({ message: err });
    }
  },
  markHelpfulQuestion: async (req, res) => {
    try {
      await atelierRequest({
        method: 'PUT',
        path: req.url,
      });
      res.status(203).send({ message: 'Successfully marked as helpful' });
    } catch (err) {
      res.status(400).send({ message: err });
    }
  },
  reportQuestion: async (req, res) => {
    try {
      await atelierRequest({
        method: 'PUT',
        path: req.url,
      });
      res.status(203).send({ message: 'Successfully reported question' });
    } catch (err) {
      res.status(400).send({ message: err });
    }
  },
  markHelpfulAnswer: async (req, res) => {
    try {
      await atelierRequest({
        method: 'PUT',
        path: req.url,
      });
      res
        .status(203)
        .send({ message: 'Successfully marked answer as helpful' });
    } catch (err) {
      res.status(400).send({ message: err });
    }
  },
  reportAnswer: async (req, res) => {
    try {
      await atelierRequest({
        method: 'PUT',
        path: req.url,
      });
      res.status(203).send({ message: 'Successfully reported answer' });
    } catch (err) {
      res.status(400).send({ message: err });
    }
  },
};

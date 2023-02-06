import { rest } from 'msw';
import { questions } from './mockData.js';

// Not yet in use
export const handlers = [
  rest.get('/qa/questions', (req, res, ctx) =>
    res(ctx.json(questions), ctx.delay(150))
  ),
  rest.post('/qa/questions/:question_id/answers', (req, res, ctx) =>
    res(ctx.status(201))
  ),
];

import { rest } from 'msw';

export const handlers = [
  rest.get('/qa/questions', (req, res, ctx) =>
    res(
      ctx.json([
        {
          question_id: 329055,
          answers: {
            3073932: {
              body: 'answer 1',
              answerer_name: 'some guy',
              helpfulness: 10,
              id: 3073932,
            },
          },
          question_body: 'hello',
          question_helpfullness: 10,
          reported: false,
        },
        {
          question_id: 329056,
          answers: {
            3073932: {
              body: 'answer 2',
              answerer_name: 'some other guy',
              helpfulness: 10,
              id: 239192,
            },
          },
          question_body: 'oh no',
          question_helpfullness: 10,
          reported: true,
        },
      ]),
      ctx.delay(150)
    )
  ),
];

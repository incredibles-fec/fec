/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import 'intersection-observer';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { setupStore } from '../../state/store';
import { renderWithProviders } from '../__mocks__/test-utils.js';
import { question, questions } from '../__mocks__/QA/mockData.js';
import {
  markQuestionHelpful,
  reportQuestion,
  markAnswerHelpful,
  reportAnswer,
} from '../../api/qa';
import QAList from '../QA/QAList.jsx';
import QAListEntry from '../QA/QAListEntry.jsx';

jest.mock('../../api/qa');
beforeEach(jest.clearAllMocks);

const qState = {
  questions: questions.slice(0, 2),
  fullQuestions: questions,
  questionCount: 2,
  query: '',
};

describe('Question tests', () => {
  it('Should load 2 questions on click', async () => {
    renderWithProviders(<QAList />, { preloadedState: { qa: qState } });
    const loadedQuestions = await screen.findAllByText('Q:', { exact: false });
    expect(loadedQuestions).toHaveLength(2);
    const button = screen.getByRole('button', {
      name: 'More Answered Questions',
    });
    await fireEvent.click(button);
    expect(await screen.findAllByText(/Q:/i)).toHaveLength(4);
  });

  it('clicking add a question button renders a question modal', async () => {
    render(<div id="modal" />);
    renderWithProviders(<QAList />, { preloadedState: { qa: qState } });
    await fireEvent.click(
      screen.getByRole('button', { name: 'Add a question' })
    );
    expect(screen.getByText(/Submit question/i)).toBeInTheDocument();
  });
});

describe('Answers tests', () => {
  it('Should display 2 answers at init', async () => {
    renderWithProviders(<QAListEntry question={question} />);

    const answers = await screen.findAllByText('A:', { exact: false });
    expect(answers).toHaveLength(2);
  });

  it('Should display 2 answer on click and hide button', async () => {
    renderWithProviders(<QAListEntry question={question} />);

    const button = screen.getByRole('button', { name: 'LOAD MORE ANSWERS' });
    fireEvent.click(button);

    const answers = await screen.findAllByText('A:', { exact: false });
    expect(answers).toHaveLength(4);
    expect(button).not.toBeInTheDocument();
  });

  it('Clicking modal button will bring up questions modal', async () => {
    render(<div id="modal" />);
    renderWithProviders(<QAListEntry question={question} />);
    await fireEvent.click(screen.getByRole('button', { name: 'Add Answer' }));
    expect(screen.getByText(/Submit Your Answer/i)).toBeInTheDocument();
  });

  // it('User should be able to submit answer', async () => {
  //   render(<div id="modal" />);
  //   renderWithProviders(<QAListEntry question={question} />);
  //   await fireEvent.click(screen.getByRole('button', { name: 'Add Answer' }));
  //   await userEvent.type(
  //     screen.getByRole('textbox', { name: /body/i }),
  //     'bad question'
  //   );
  //   await userEvent.type(
  //     screen.getByRole('textbox', { name: /nickname/i }),
  //     'Mr. Incredible'
  //   );
  //   await userEvent.type(
  //     screen.getByRole('textbox', { name: /email/i }),
  //     'mr@incredible.com'
  //   );
  //   await fireEvent.click(
  //     screen.getByRole('button', { name: /Submit answer/i })
  //   );
  //   await submitForm();
  // });
});

// describe('Mark helpful and report', () => {
//   it('Clicking yes marks question as helpful', async () => {
//     markQuestionHelpful.mockResolvedValue();
//     renderWithProviders(<QAListEntry question={question} />);
//     await fireEvent.click(screen.getAllByText(/yes/i)[0]);
//     // await fireEvent.click(screen.getAllByText(/yes/i)[0]);
//     expect(await markQuestionHelpful).toHaveBeenCalledTimes(1);
//   });
//   it('Clicking report reports the question', async () => {
//     reportQuestion.mockResolvedValue();
//     renderWithProviders(<QAListEntry question={question} />);
//     await waitFor(() => {
//       fireEvent.click(screen.getAllByText(/report/i)[0]);
//     });
//     fireEvent.click(screen.getAllByText(/reported/i)[0]);
//     expect(reportQuestion).toHaveBeenCalledTimes(1);
//   });
//   it('Clicking yes marks answer as helpful', async () => {
//     markAnswerHelpful.mockResolvedValue();
//     renderWithProviders(<QAListEntry question={question} />);
//     await fireEvent.click(screen.getAllByText(/yes/i)[0]);
//     expect(markAnswerHelpful).toHaveBeenCalledTimes(1);
//   });
//   it('Clicking report reports the answer', async () => {
//     reportAnswer.mockResolvedValue();
//     renderWithProviders(<QAListEntry question={question} />);
//     await fireEvent.click(screen.getAllByText(/report/i)[0]);
//     expect(reportAnswer).toHaveBeenCalledTimes(1);
//   });
// });

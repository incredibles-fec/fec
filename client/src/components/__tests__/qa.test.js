/**
 * @jest-environment jsdom
 */

import React from 'react';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import 'intersection-observer';
import { fireEvent, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { setupStore } from '../../state/store';
import { renderWithProviders } from '../__mocks__/test-utils.js';
import { question, questions } from '../__mocks__/QA/mockData.js';
import { handlers } from '../__mocks__/QA/handlers';
import QAList from '../QA/QAList.jsx';
import QAListEntry from '../QA/QAListEntry.jsx';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Question tests', () => {
  const qState = {
    questions: questions.slice(0, 2),
    fullQuestions: questions,
    questionCount: 2,
    query: '',
  };

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

  // it('');
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

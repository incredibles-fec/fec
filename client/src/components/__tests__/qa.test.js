/**
 * @jest-environment jsdom
 */

import React from 'react';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
// import { setupStore } from '../../../state/store';
// import { getQA } from '../../../state/qa';
import { renderWithProviders } from '../__mocks__/QA/test-utils.js';
import { question } from '../__mocks__/QA/mockData.js';
import { handlers } from '../__mocks__/QA/handlers';
import QAListEntry from '../QA/QAListEntry.jsx';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

  it('clicking modal button will bring up questions modal', async () => {
    render(<div id="modal" />);
    renderWithProviders(<QAListEntry question={question} />);
    await fireEvent.click(screen.getByRole('button', { name: 'Add Answer' }));
    expect(screen.getByText(/Submit Your Answer/i)).toBeInTheDocument();
  });
});

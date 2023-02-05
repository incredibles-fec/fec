import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import QAList from '../QA/QAList.jsx';

afterEach(cleanup);

it('should render the QA component', () => {
  const initialState = {
    questions: [],
    fullQuestions: [],
    questionCount: 2,
    isLoading: true,
    query: '',
  };
  render(<QAList />);
});

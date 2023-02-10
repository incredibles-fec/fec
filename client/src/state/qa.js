import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  questions: [],
  fullQuestions: [],
  questionCount: 2,
  isLoading: true,
  query: '',
};

export const getQA = createAsyncThunk('qa/getQA', async (_, thunkAPI) => {
  let fetchRequired = true;
  let count = 30;

  const product = thunkAPI.getState().pd;

  while (fetchRequired) {
    /* eslint-disable no-await-in-loop */
    const res = await axios({
      url: '/qa/questions',
      params: { product_id: product?.currentProduct?.id ?? 40351, count },
    });

    if (res.data.results.length === count) {
      count += 30;
    } else fetchRequired = false;
    if (!fetchRequired) {
      const questions = res.data.results.sort(
        (a, b) => b.question_helpfulness - a.question_helpfulness
      );
      return questions;
    }
  }
});

const qaSlice = createSlice({
  name: 'qa',
  initialState,
  reducers: {
    loadMoreQuestions: (state) => {
      state.questionCount += 2;
      state.questions = state.fullQuestions.slice(0, state.questionCount);
    },
    filterQuestions: (state) => {
      if (!state.query.length) {
        state.questions = state.fullQuestions.slice(0, state.questionCount);
        return;
      }

      state.questions = state.fullQuestions.filter((ele) => {
        const query = state.query.toLowerCase();
        if (ele.question_body.toLowerCase().includes(query)) return ele;
        const answers = Object.values(ele.answers);
        for (let i = 0; i < answers.length; i += 1) {
          if (answers[i].body.toLowerCase().includes(query)) return ele;
        }
        return false;
      });
    },
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQA.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getQA.fulfilled, (state, action) => {
      state.questionCount = 2;
      const filtered = action.payload.filter((q) => {
        const date = new Date(q.question_date);
        const today = new Date();
        const checkIfSameDate =
          date.getFullYear() === today.getFullYear() &&
          date.getMonth() === today.getMonth() &&
          date.getDate() === today.getDate();
        return Object.values(q.answers).length || checkIfSameDate;
      });
      state.questions = filtered.slice(0, 2);
      state.fullQuestions = filtered;
      state.isLoading = false;
    });
    builder.addCase(getQA.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { loadMoreQuestions, filterQuestions, updateQuery } =
  qaSlice.actions;
export default qaSlice.reducer;

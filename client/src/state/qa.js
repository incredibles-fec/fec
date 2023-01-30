import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  questions: [],
  fullQuestions: [],
  questionCount: 4,
  isLoading: true,
};

export const getQA = createAsyncThunk(
  'qa/getQA',
  async (productId, thunkAPI) => {
    try {
      const res = await axios('/qa/questions');
      const questions = res.data.results
        .sort((a, b) => b.question_helpfulness - a.question_helpfulness)
        .map((q) => ({ ...q, answer_count: 2 }));
      return questions;
    } catch (err) {
      console.log(err);
    }
  }
);

const qaSlice = createSlice({
  name: 'qa',
  initialState,
  reducers: {
    loadMoreQuestions: (state) => {
      state.questionCount += 2;
      state.questions = state.fullQuestions.slice(0, state.questionCount);
    },
    loadMoreAnswers: (state, action) => {
      state.questions = state.questions.map((q) => ({
        ...q,
        answer_count:
          q.question_id === action.payload
            ? (q.answer_count += 2)
            : q.answer_count,
      }));
    },
    filterQuestions: (state, action) => {
      const query = action.payload;
      if (!query.length) {
        state.questions = state.fullQuestions.slice(0, state.questionCount);
        return;
      }

      state.questions = state.fullQuestions.filter((ele) => {
        if (ele.question_body.includes(query)) return ele;
        const answers = Object.values(ele.answers);
        for (let i = 0; i < answers.length; i += 1) {
          if (answers[i].body.includes(query)) return ele;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQA.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getQA.fulfilled, (state, action) => {
      state.isLoading = false;
      state.questions = action.payload.slice(0, state.questionCount);
      state.fullQuestions = action.payload;
    });
    builder.addCase(getQA.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { loadMoreQuestions, loadMoreAnswers, filterQuestions } =
  qaSlice.actions;
export default qaSlice.reducer;

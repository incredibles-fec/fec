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

  try {
    while (fetchRequired) {
      const res = await axios({
        url: '/qa/questions',
        params: { product_id: 40355, count },
      });

      if (res.data.results.length === count) {
        count += 30;
      } else fetchRequired = false;
      if (!fetchRequired) {
        // everytime we refetch, answer count gets set to 2
        const questions = res.data.results
          .sort((a, b) => b.question_helpfulness - a.question_helpfulness)
          .map((q) => ({ ...q, answer_count: 2 }));
        return questions;
      }
    }
  } catch (err) {
    console.log(err);
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
    loadMoreAnswers: (state, action) => {
      state.questions = state.questions.map((q) => ({
        ...q,
        answer_count:
          q.question_id === action.payload
            ? (q.answer_count += 2)
            : q.answer_count,
      }));
      // need to update answer count here too
      state.fullQuestions = state.fullQuestions.map((q) => ({
        ...q,
        answer_count:
          q.question_id === action.payload
            ? (q.answer_count += 2)
            : q.answer_count,
      }));
    },
    filterQuestions: (state) => {
      if (!state.query.length) {
        state.questions = state.fullQuestions.slice(0, state.questionCount);
        return;
      }

      state.questions = state.fullQuestions.filter((ele) => {
        if (ele.question_body.toLowerCase().includes(state.query)) return ele;
        const answers = Object.values(ele.answers);
        for (let i = 0; i < answers.length; i += 1) {
          if (answers[i].body.toLowerCase().includes(state.query)) return ele;
        }
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
      // TODO ONLY DISPLAY QUESTIONS WITH ANSWERS
      state.isLoading = false;
      const filtered = action.payload.filter(
        (questions) => Object.values(questions.answers).length
      );
      state.questions = filtered.slice(0, state.questionCount);
      state.fullQuestions = filtered;
    });
    builder.addCase(getQA.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {
  loadMoreQuestions,
  loadMoreAnswers,
  filterQuestions,
  updateQuery,
} = qaSlice.actions;
export default qaSlice.reducer;

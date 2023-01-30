import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  questions: [],
  isLoading: true,
};

export const getQA = createAsyncThunk(
  'qa/getQA',
  async (productId = 40347, thunkAPI) => {
    try {
      const res = await axios('/qa/questions');
      const questions = res.data.results.sort(
        (a, b) => b.question_helpfulness - a.question_helpfulness
      );

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
    reduxTest: (state) => {
      state.questions.push(4);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQA.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getQA.fulfilled, (state, action) => {
      state.isLoading = false;
      state.questions = action.payload;
    });
    builder.addCase(getQA.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { reduxTest } = qaSlice.actions;
export default qaSlice.reducer;

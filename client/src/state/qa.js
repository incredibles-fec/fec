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
      // const res2 = await axios('/qa/questions/:question_id/answers');
      return res.data.results;
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
  extraReducers: {
    [getQA.pending]: (state) => {
      state.isLoading = true;
    },
    [getQA.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.questions = action.payload;
    },
    [getQA.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { reduxTest } = qaSlice.actions;
export default qaSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// createSlice allows us to group state, actions, and reducers in one file instead of separating
// EXAMPLE -> file is imported into QA.js
const initialState = {
  questions: [1, 2, 3],
  isLoading: true,
};

// createAsyncThunk allows us to update state with fetch data
// need to export right away
export const getQA = createAsyncThunk('qa/getQA', () => {
  // return fetch('someUrl')
});

// more complex async function
// export const getQA = createAsyncThunk('qa/getQA', async (_, thunkAPI) => {
//   // thunkAPI.getState() -> gets entire state
//   // thunkAPI.dispatch(a reducer you wrote)
//   try {
//     const res = await axios(url);
//     return res.data;
//   } catch (err) {}
// });

// Slice is the way to call it
const qaSlice = createSlice({
  name: 'qa',
  initialState,
  reducers: {
    // these are actions -> can mutate the state directly
    questionFunc: (state) => {
      state.questions.push(4);
    },
  },
  // for async with lifecycle actions: pending / fulfilled / rejected
  extraReducers: {
    // when loading
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

// need to export reducers
export const { questionFunc } = qaSlice.actions;

export default qaSlice.reducer;

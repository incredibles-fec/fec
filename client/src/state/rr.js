import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reviews: [],
  fullReviews: [],
  reviewCount: 4,
  isLoading: true,
};

export const getReviews = createAsyncThunk(
  'rr/getReviews',
  async (productId, thunkAPI) => {
    try {
      const res = await axios('/reviews');
      const reviews = res.data.results;
      return reviews;
    } catch (err) {
      console.log(err);
    }
  }
);

const rrSlice = createSlice({
  name: 'rr',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReviews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.fullReviews = action.payload;
      console.log(action.payload);
      state.isLoading = false;
    });
    builder.addCase(getReviews.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default rrSlice.reducer;

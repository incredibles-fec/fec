import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reviews: [],
  fullReviews: [],
  metaData: {},
  page: 1,
  count: 30,
  reviewCount: 2,
  isLoading: true,
};

export const getReviews = createAsyncThunk(
  'rr/getReviews',
  async (productId, thunkAPI) => {
    const rrState = thunkAPI.getState().rr;

    try {
      const res = await axios({
        url: '/reviews',
        params: {
          page: rrState.page,
          count: rrState.count,
          sort: 'relevant',
          product_id: 40355,
        },
      });
      const reviews = res.data.results;
      return reviews;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getMetaData = createAsyncThunk(
  'rr/getMetaData',
  async (productId, thunkAPI) => {
    try {
      const res = await axios({
        url: '/reviews/meta',
        params: { product_id: 40355 },
      });
      const metaData = res.data;
      return metaData;
    } catch (err) {
      console.log(err);
    }
  }
);

const rrSlice = createSlice({
  name: 'rr',
  initialState,
  reducers: {
    loadMoreReviews: (state) => {
      console.log('invoked');
      state.reviewCount += 2;
      state.reviews = state.fullReviews.slice(0, state.reviewCount);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReviews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.fullReviews = action.payload;
      state.reviews = action.payload.slice(0, state.reviewCount);
      state.isLoading = false;
    });
    builder.addCase(getReviews.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getMetaData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMetaData.fulfilled, (state, action) => {
      state.metaData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getMetaData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { loadMoreReviews } = rrSlice.actions;
export default rrSlice.reducer;

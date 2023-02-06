import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reviews: [],
  filteredReviews: [],
  fullReviews: [],
  metaData: {},
  filters: [],
  query: '',
  sort: 'relevant',
  totals: {},
  reviewCount: 2,
  isLoading: true,
};

export const getReviews = createAsyncThunk(
  'rr/getReviews',
  async (_, thunkAPI) => {
    let fetchRequired = true;
    let count = 30;

    const rrState = thunkAPI.getState().rr;
    const product = thunkAPI.getState().pd;

    try {
      // TODO: Not sure how to handle multiple fetches asynchronously if dependent on first fetch
      while (fetchRequired) {
        /* eslint-disable no-await-in-loop */
        const res = await axios({
          url: '/reviews',
          params: {
            count,
            sort: rrState.sort,
            product_id: product?.currentProduct?.id ?? 40355,
          },
        });

        if (res.data.results.length === count) {
          count += 30;
        } else fetchRequired = false;

        if (!fetchRequired) return res.data.results;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const getMetaData = createAsyncThunk(
  'rr/getMetaData',
  async (productId, thunkAPI) => {
    const res = await axios({
      url: '/reviews/meta',
      params: { product_id: 40355 },
    });
    // TODO: switch product_id
    const metaData = res.data;
    return metaData;
  }
);

const rrSlice = createSlice({
  name: 'rr',
  initialState,
  reducers: {
    loadMoreReviews: (state) => {
      if (state.reviewCount >= state.fullReviews.length) return;
      state.reviewCount += 2;

      state.reviews = state.filteredReviews.length
        ? state.filteredReviews.slice(0, state.reviewCount)
        : state.fullReviews.slice(0, state.reviewCount);
    },
    addStarFilter: (state, action) => {
      const findIndex = state.filters.indexOf(action.payload);
      if (findIndex < 0) {
        state.filters.push(action.payload);
        return;
      }
      state.filters.splice(findIndex, 1);
    },
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
    updateSort: (state, action) => {
      state.sort = action.payload;
      state.reviewCount = 2;
    },
    filterReviews: (state) => {
      const filtered = state.fullReviews.filter((review) => {
        // if filters -> check rating -> else default true to check query condition
        const checkFilters = state.filters.length
          ? state.filters.includes(review.rating.toString())
          : true;
        const query = state.query.toLowerCase();

        return (
          checkFilters &&
          (review.body.toLowerCase().includes(query) ||
            review.summary.toLowerCase().includes(query))
        );
      });

      state.reviews = filtered.slice(0, state.reviewCount);
      state.filteredReviews = filtered;
    },
    clearFilters: (state) => {
      state.filters = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReviews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      // This is for persisting the selected filters (star + query) when fetching new sort
      const reviews = action.payload.filter((review) => {
        const query = state.query.toLowerCase();
        const body = review.body.toLowerCase();
        const summary = review.summary.toLowerCase();
        const rating = review.rating.toString();

        const checkFilters = state.filters.length
          ? state.filters.includes(rating)
          : true;

        return (
          checkFilters && (body.includes(query) || summary.includes(query))
        );
      });
      state.fullReviews = action.payload;

      if (!state.query.length && !state.filters.length) {
        state.filteredReviews = [];
      } else state.filteredReviews = reviews;
      state.reviews = reviews.slice(0, state.reviewCount);

      // manually build averages and total
      const totals = action.payload.reduce(
        (acc, review) => {
          acc.totalReviews += 1;
          acc.aggregate += review.rating;
          acc.average = acc.aggregate / acc.totalReviews;
          acc.recommend = review.recommend ? acc.recommend + 1 : acc.recommend;
          acc.ratings[review.rating] += 1;
          return acc;
        },
        {
          totalReviews: 0,
          aggregate: 0,
          average: 0,
          recommend: 0,
          ratings: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          },
        }
      );
      state.totals = totals;
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

export const {
  loadMoreReviews,
  addStarFilter,
  updateQuery,
  updateSort,
  filterReviews,
  clearFilters,
} = rrSlice.actions;
export default rrSlice.reducer;

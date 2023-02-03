import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  products: [],
  currentProduct: null,
  currentProductStyles: [],
  loading: true
};

export const getProducts = createAsyncThunk(
  'pd/getProducts',
  async (thunkAPI, { rejectWithValue }) => {
    try {
      const prods = await axios.get('/products');
      const { id } = prods.data[0];
      const firstProd = await axios.get(`/products/${id}`);
      const firstProdStyles = await axios.get(`/products/${id}/styles`);
      return {
        loadProducts: prods.data,
        loadCurrent: firstProd.data,
        loadCurrentStyles: firstProdStyles.data.results
      };
    } catch (err) {
      return rejectWithValue('Error getting products');
    }
  }
);

export const pdSlice = createSlice({
  name: 'pd',
  initialState,
  reducers: {
    changeCurrentProductById: (state, action) => {
      const product = state.products.filter((p) => p.id === action.payload);
      if (product.length) {
        state.currentProduct = product;
        try {
          axios.get(`/products${action.payload}/styles`)
            .then((res) => {
              state.currentProductStyles = res.data.results;
            });
        } catch (err) {
          console.log('Error loading styles of specified product');
        }
      } else {
        console.log('Error finding specified product');
      }
    }
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload.loadProducts;
      state.currentProduct = payload.loadCurrent;
      state.currentProductStyles = payload.loadCurrentStyles;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
    }
  }
});

// Action creators are generated for each case reducer function
export const { changeCurrentProductById } = pdSlice.actions;

export default pdSlice.reducer;

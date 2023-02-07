import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  currentProduct: null,
  currentProductStyles: [],
  loading: true,
};

export const postToCart = createAsyncThunk(
  'pd/postToCart',
  async (id, thunkAPI) => {
    try {
      const obj = { sku_id: id };
      const data = await axios.post('/cart', obj);
      data.reduxRequestId = thunkAPI.requestId;
      return data;
    } catch (err) {
      return 'Error adding to cart teehee';
    }
  }
);

export const getProducts = createAsyncThunk(
  'pd/getProducts',
  async (thunkAPI) => {
    try {
      const prods = await axios.get('/products');
      const { id } = prods.data[0];
      const firstProd = await axios.get(`/products/${id}`);
      const firstProdStyles = await axios.get(`/products/${id}/styles`);
      return {
        loadProducts: prods.data,
        loadCurrent: firstProd.data,
        loadCurrentStyles: firstProdStyles.data.results,
      };
    } catch (err) {
      return 'Error getting products';
    }
  }
);

export const changeCurrentProductById = createAsyncThunk(
  'pd/changeCurrentProductById',
  async (id, thunkAPI) => {
    try {
      const newProduct = await axios.get(`/products/${id}`);
      const newProductStyles = await axios.get(`/products/${id}/styles`);
      return {
        newProduct: newProduct.data,
        newProductStyles: newProductStyles.data.results,
      };
    } catch (err) {
      return 'Error changing product by id';
    }
  }
);

export const pdSlice = createSlice({
  name: 'pd',
  initialState,
  reducers: {
    test: (state, action) => {
      console.log('Testing reducers in state/pd.js');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.loadProducts;
      state.currentProduct = action.payload.loadCurrent;
      state.currentProductStyles = action.payload.loadCurrentStyles;
      state.loading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(changeCurrentProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changeCurrentProductById.fulfilled, (state, action) => {
      state.currentProduct = action.payload.newProduct;
      state.currentProductStyles = action.payload.newProductStyles;
      state.loading = false;
    });
    builder.addCase(changeCurrentProductById.rejected, (state) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { test } = pdSlice.actions;

export default pdSlice.reducer;

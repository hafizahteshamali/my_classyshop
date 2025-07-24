import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: []
};

const ProductReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    // ✅ FIXED: Now updates products from payload
    getProductData: (state, action) => {
      state.products = action.payload;
    },

    createProductData: (state, { payload }) => {
      const existingProduct = state.products.find((product) => product.productName === payload.productName);
      if (payload?.productName && payload.quantity > 0) {
        if (existingProduct) {
          existingProduct.quantity += payload.quantity;
        } else {
          state.products.push(payload);
        }
      }
    },

    deleteProductData: (state, { payload }) => {
      const existingProductIndex = state.products.findIndex(
        (product) => product.productName === payload.productName
      );
      if (payload?.productName && payload.quantity > 0) {
        if (existingProductIndex !== -1) {
          const existingProduct = state.products[existingProductIndex];
          if (existingProduct.quantity > payload.quantity) {
            existingProduct.quantity -= payload.quantity;
          } else {
            state.products.splice(existingProductIndex, 1);
          }
        }
      }
    },

    updateProductData: (state, { payload }) => {
      const productIndex = state.products.findIndex(
        (product) => product._id === payload._id
      );
      if (productIndex !== -1) {
        state.products[productIndex] = {
          ...state.products[productIndex],
          ...payload,
        };
      }
    },
  }
});

export const {
  getProductData,
  createProductData,
  deleteProductData,
  updateProductData
} = ProductReducer.actions;

export default ProductReducer.reducer;

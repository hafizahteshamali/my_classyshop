import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from "./Reducers.js";

const store = configureStore({
  reducer: {
    ProductReducer
  },
})

export default store;
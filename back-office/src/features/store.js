import { configureStore } from "@reduxjs/toolkit";
import reducer from './slice';

const store = configureStore({reducer: {
    slice: reducer, 
  },})

export default store;
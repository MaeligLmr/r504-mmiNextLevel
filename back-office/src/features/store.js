import { configureStore } from "@reduxjs/toolkit";
import reducer from './slice';

const store = configureStore({reducer: {
    univ: reducer, 
  },})

export default store;
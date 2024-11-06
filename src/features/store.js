import { configureStore } from "@reduxjs/toolkit";
import formationsReducer from './formation/formationSlice';

const store = configureStore({reducer: {
    formations: formationsReducer, 
  },})

export default store;
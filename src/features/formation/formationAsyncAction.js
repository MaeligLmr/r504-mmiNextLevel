import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL_API_FORMATIONS, URL_API_MASTERS } from '../../config';

export const loadFormations = createAsyncThunk(
    'formation/loadFormations', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(URL_API_FORMATIONS); 
      return response.data; 
    } catch (error) {
      return rejectWithValue("L'application est actuellement indisponible, Veuillez réessayer ultérieurement")
    }
  }
);

export const loadMasters = createAsyncThunk(
  'formation/loadMasters', // Nom de l'action
async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(URL_API_MASTERS); 
    return response.data; 
  } catch (error) {
    return rejectWithValue("L'application est actuellement indisponible, Veuillez réessayer ultérieurement")
  }
}
);

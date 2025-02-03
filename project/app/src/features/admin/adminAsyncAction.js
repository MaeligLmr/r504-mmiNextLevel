import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL_API_FORMATIONS } from '../../utils/config';

export const load = createAsyncThunk(
    'formation/loadFormations', // Nom de l'action
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(URL_API_FORMATIONS);
      //console.log(response);
      return response.data; // Retourne les données des formations
    } catch (error) {
      return rejectWithValue("L'application est actuellement indisponible, Veuillez réessayer ultérieurement")
    }
  }
);


import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL_API_FORMATIONS } from '../../utils/config';

export const loadFormations = createAsyncThunk(
    'formation/loadFormations', // Nom de l'action
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(URL_API_FORMATIONS); // Remplacez par votre endpoint API
      return response.data; // Retourne les données des formations
    } catch (error) {
      return rejectWithValue("L'application est actuellement indisponible, Veuillez réessayer ultérieurement")
    }
  }
);


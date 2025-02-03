import {
  createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  URL_API_FORMATIONS,
  URL_API_MASTERS
} from '../../config';

export const loadFormations = createAsyncThunk(
  'formation/loadFormations', // Nom de l'action
  async (_, {
    rejectWithValue
  }) => {
    try {
      const response = await axios.get(URL_API_FORMATIONS);
      return response.data; // Retourne les données des formations
    } catch (error) {
      return rejectWithValue("L'application est actuellement indisponible, veuillez réessayer ultérieurement.")
    }
  }
);

export const loadMasters = createAsyncThunk(
  'masters/loadMasters',
  async (_, {
    rejectWithValue
  }) => {
    try {
      const response = await axios.get(URL_API_MASTERS);
      return response.data;
    } catch (error) {
      return rejectWithValue("Les masters ne sont pas disponibles, veuillez réessayer ultérieurement.")
    }
  }
);

export const addFormation = createAsyncThunk(
  'formation/addFormation',
  async (formationData, {
    rejectWithValue
  }) => {
    try {
      // Envoi d'une requête POST à l'API pour créer une nouvelle formation
      const response = await axios.post(URL_API_FORMATIONS, formationData);
      return response.data; // Retourne les données de la formation créée
    } catch (error) {
      // Gestion des erreurs : on retourne l'erreur à la fonction de rejet
      throw new Error(error)
    }
  }
);

// Modifie une université
export const updateFormation = createAsyncThunk(
  'formation/updateFormation',
  async (dataToSend, {
    getState
  }) => {
    try {
      const response = await axios.put(URL_API_FORMATIONS + "/update/etablissement/" + getState().admin.idUnivEdited, dataToSend);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const deleteFormation = createAsyncThunk(
  'formation/deleteFormation',
  async (formationId, {
    rejectWithValue
  }) => {
    try {
      const response = await axios.delete(URL_API_FORMATIONS + `/${formationId}`, formationId);
      return response.data[0];
    } catch (error) {

      throw new Error(error)
    }
  }
);
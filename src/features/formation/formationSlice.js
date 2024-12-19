import {
    createSlice
} from '@reduxjs/toolkit';
import {
    addFormation,
    deleteFormation,
    loadFormations,
    updateFormation,
    loadMasters,
} from './formationAsyncAction';

const formationSlice = createSlice({
    name: 'formation',
    initialState: {
        formations: [],
        masters: [],
        loading: false,
        currentId: null,
        errors: {
            apiErrorLoad: null,
        },
    },
    reducers: {


    },

    extraReducers: (builder) => {
        builder
            .addCase(loadFormations.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadFormations.fulfilled, (state, action) => {
                state.loading = false;
                state.formations = action.payload;
            })
            .addCase(loadFormations.rejected, (state, action) => {
                state.errors.apiErrorLoad = action.payload || "Erreur lors du chargement des formations";
                state.loading = action.false;
            })
            .addCase(loadMasters.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadMasters.fulfilled, (state, action) => {
                state.loading = false;
                state.formations = action.payload;
            })
            .addCase(loadMasters.rejected, (state, action) => {
                state.errors.apiErrorLoad = action.payload || "Erreur lors du chargement des formations";
                state.loading = action.false;
            })

    }
})


export default formationSlice.reducer;
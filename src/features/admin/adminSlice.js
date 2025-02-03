import {
    createSlice
} from '@reduxjs/toolkit';
import {
    addFormation,
    deleteFormation,
    loadFormations,
    loadMasters,
    updateFormation
} from './adminAsyncAction';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        univ: [],
        masters: [],
        isAdmin: true,
        editing: false,
        idUnivEdited: null
    },
    reducers: {
        startEdit(state, action) {
            state.editing = true;
            state.idUnivEdited = action.payload;
        },
        stopEdit(state) {
            state.editing = false;
            state.idUnivEdited = null;
        }
    },
    errors: {
        apiErrorLoad: null,
    },
    extraReducers: (builder) => {
        builder.addCase(loadFormations.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadFormations.fulfilled, (state, action) => {
                state.univ = action.payload;
                state.loading = false;
            })
            .addCase(loadFormations.rejected, (state, action) => {
                console.log(action.error.message);
                state.loading = false;
            })
            //    .addCase(addFormation.fulfilled, (state, action)=>{
            //     state.univ.push(action.payload);
            //     state.editing = false;
            // })
            // .addCase(addFormation.rejected, (state, action)=>{
            //     console.log("Erreur lors de l'ajout de formation :" + action.error.message)
            // })
            .addCase(updateFormation.fulfilled, (state, action) => {
                state.univ[state.univ.findIndex((element) => element._id === state.idUnivEdited)] = action.payload;
                state.editing = false;
                state.idUnivEdited = null;
            })
            .addCase(updateFormation.rejected, (state, action) => {
                console.log(action.error.message);
            })
            .addCase(loadMasters.fulfilled, (state, action) => {
                state.masters = action.payload;
                state.loading = false;
            })
            .addCase(loadMasters.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadMasters.rejected, (state, action) => {
                state.loading = false;
            })
        // .addCase(deleteFormation.fulfilled, (state, action) => {
        //     state.univ = state.univ.filter((formation) => formation._id !== action.payload._id);
        //     state.loading = false; 
        //   })
        //   // Cas rejected pour deleteFormationAsync
        //   .addCase(deleteFormation.rejected, (state, action) => {
        //     console.log('Erreur lors de la suppression du formation :', action.payload);
        //     state.loading = false; 

        //   });
    }
})

export const {
    startEdit,
    stopEdit
} = adminSlice.actions;
export default adminSlice.reducer;
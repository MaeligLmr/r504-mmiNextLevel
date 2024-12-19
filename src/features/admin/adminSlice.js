import { createSlice } from '@reduxjs/toolkit';
import { addFormation, deleteFormation, loadFormations, updateFormation } from './formationAsyncAction';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        univ:[],
        isAdmin: true,
        editing: false,
        idUnivEdited: null
    },
    reducers: {
        startEdit(state, action){
            state.editing = true;
            state.idUnivEdited = action.payload;
       },
       stopEdit(state){
            state.editing = false;
            state.idUnivEdited = null;
       }
    },
    errors: {
        apiErrorLoad: null,
    },
    extraReducers: (builder) => {
        builder.addCase(loadFormations.pending, (state, action)=> {
            state.loading = true;
       })
       .addCase(loadFormations.fulfilled, (state, action)=> {
            state.univ = action.payload;
            state.loading = false;
       })
       .addCase(loadFormations.rejected, (state, action)=> {
            console.log(action.error.message);
            state.loading = false;
       })
       .addCase(addFormation.fulfilled, (state, action)=>{
        state.formations.push(action.payload);
        state.isEditing = false;
    })
    .addCase(addFormation.rejected, (state, action)=>{
        console.log("Erreur lors de l'ajout de formation :" + action.error.message)
    })
    .addCase(updateFormation.fulfilled, (state, action) => {
        const index = state.formations.findIndex(formation => formation.id === action.payload.id);
        if (index !== -1) {
            state.formations[index] = action.payload; 

        state.loading = false; 
        state.isEditing = false;

    }})
    .addCase(updateFormation.rejected, (state,action) => {
        state.loading = false;
        console.log("Erreur lors de l'édition de formation :" + action.error.message)

    })
    .addCase(deleteFormation.fulfilled, (state, action) => {
        state.formations = state.formations.filter((formation) => formation.id !== action.payload.id);
        state.loading = false; 
      })
      // Cas rejected pour deleteFormationAsync
      .addCase(deleteFormation.rejected, (state, action) => {
        console.log('Erreur lors de la suppression du formation :', action.payload);
        state.loading = false; 
        
      });
    }
})

export const { startEdit, stopEdit } = adminSlice.actions;
export default adminSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { addFormation, deleteFormation, loadFormations, updateFormation } from './formationAsyncAction';

const formationSlice = createSlice({
    name: 'formation',
    initialState: {
    formations : [],
       loading : false,
       currentId : null

    },
    reducers: {
        
       
    },
    errors: {
        apiErrorLoad: null,
        },
    extraReducers: (builder) => {
       builder
            .addCase(loadFormations.pending, (state, action)=>{
                state.loading = true;
            })
            .addCase(loadFormations.fulfilled, (state, action)=>{
                state.loading = false;
                state.formations = action.payload;
            })
    }
})


export default formationSlice.reducer; 
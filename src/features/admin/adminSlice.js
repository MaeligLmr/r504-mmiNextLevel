import { createSlice } from '@reduxjs/toolkit';
import { load } from './adminAsyncAction';

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
        builder.addCase(load.pending, (state, action)=> {
            state.loading = true;
       })
       .addCase(load.fulfilled, (state, action)=> {
            state.univ = action.payload;
            state.loading = false;
       })
       .addCase(load.rejected, (state, action)=> {
            console.log(action.error.message);
            state.loading = false;
       })
    }
})

export const { startEdit, stopEdit } = adminSlice.actions;
export default adminSlice.reducer;
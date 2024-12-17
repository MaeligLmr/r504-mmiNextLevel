import { createSlice } from '@reduxjs/toolkit';
import { load } from './asyncAction';

const slice = createSlice({
    name: 'slice',
    initialState: {
        univ: [],
        loading: false,
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

export const { startEdit, stopEdit } = slice.actions;
export default slice.reducer;
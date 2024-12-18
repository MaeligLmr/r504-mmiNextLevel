import { createSelector } from "@reduxjs/toolkit";

export const selectFormations = (state) => state.slice.univ;
export const selectLoading = (state) => state.slice.loading;
export const selectEdit = (state) => state.slice.editing;
export const selectEditID = (state) => state.slice.idUnivEdited;

export const selectInitialFormValues = createSelector(
    [selectFormations, selectEditID],
    (univs, id) => {
        if (id) {
            return univs.find((univ) => id === univ._id);         
        } else {
            return null;
        }
    }
)
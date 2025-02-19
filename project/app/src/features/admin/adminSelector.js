import { createSelector } from "@reduxjs/toolkit";

export const selectFormations = (state) => state.admin.univ;
export const selectIsAdmin = (state) => state.admin.isAdmin;
export const selectEdit = (state) => state.admin.editing;
export const selectEditID = (state) => state.admin.idUnivEdited;
export const selectMasters = (state) => state.admin.masters;

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

/* export const selectInitialFormValues = createSelector(
    [selectFormations, selectEditID, selectMasters],
    (univs, id, masters) => {
        if (id) {
            const formation = univs.find((univ) => id === univ._id);
            const master = masters.find((master) => master._id == formation.masters._idMaster);
            const initialValues = {...formation, master: master};
            return initialValues;       
        } else {
            return null;
        }
    }
) */
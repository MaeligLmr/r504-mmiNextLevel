// faire les selector de toutes les formations + le selector des formations filtrées
export const selectFormations = (state) => state.formations.formations;
export const selectTotalFormations = (state) => state.formations.formations.length;
export const selectLoading = (state) => state.formations.loading;
export const selectEditing = (state) => state.formations.isEditing;
export const selectSortedFormationsByReleaseDate = (state) => {
    return [...state.formations.formations].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  };
export const selectFormTitle = (state) =>{
    return state.formations.currentId === null ? "Ajouter un Formation" : "Modifier un Formation";

}
export const selectInitialFormValues = (state)=>{
    if(state.formations.currentId === null){
        return null
    }else return state.formations.formations.find((formation)=> formation.id === state.formations.currentId)
}
export const selectErrorLoad = (state) => state.formations.errors.apiErrorLoad;


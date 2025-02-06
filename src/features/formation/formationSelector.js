// faire les selector de toutes les formations + le selector des formations filtrées
export const selectFormations = (state) => state.formation.formations;
export const selectMasters = (state) => state.formation.masters;
export const selectTotalFormations = (state) => state.formation.formations.length;
export const selectLoading = (state) => state.formation.loading;
export const selectEditing = (state) => state.formation.isEditing;
export const selectSortedFormationsByReleaseDate = (state) => {
    return [...state.formation.formations].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  };
export const selectFormTitle = (state) =>{
    return state.formation.currentId === null ? "Ajouter un Formation" : "Modifier un Formation";

}
export const selectInitialFormValues = (state)=>{
    if(state.formation.currentId === null){
        return null
    }else return state.formation.formations.find((formation)=> formation.id === state.formation.currentId)
}
export const selectErrorLoad = (state) => state.formation.errors.apiErrorLoad;

export const selectRegions = (state) => {
    const allRegions = state.formation.formations.map((formation) => formation.region);

    // Supprimer les doublons
    const uniqueRegions = [...new Set(allRegions)];

    // Retourner la liste des régions uniques
    return uniqueRegions.sort();
}

export const selectKeywords = (state) => {
    const allKeywords =  state.formation.masters.flatMap((master) => master.competences);
    return [... new Set(allKeywords)].sort()
}
import { useDispatch, useSelector } from 'react-redux';
import FormationRow from './FormationRow';
import FilterForm from './FilterForm';
import { useMemo, useState } from 'react';
import { selectFormations, selectMasters } from '../features/formation/formationSelector';
import { filterIncludes, filterIncludesArray } from '../utils/filters';

function FormationList() {
    const [filters, setFilters] = useState([]); // State pour les filtres actifs
    const formationList = useSelector(selectFormations);
    const masterList = useSelector(selectMasters);
    const filteredFormations = useMemo(() => {
        if (filters.length === 0) return formationList; 
        const filterFunc = (formation) => filters.every((filter) => {
            if(filter.type === "master")
                {
                    return formation.masters.some((master) => filter.function(master))
                } else if (filter.type === "masterKeywords"){
                    const filteredMasters = masterList.filter((master) => filter.function(master));
                    console.log(filteredMasters);
                    const filteredMastersId = filteredMasters.map((master) => master._idMaster);
                    filteredMastersId.every((masterId) =>{
                            return formation.masters.some((master) => filterIncludes('_idMaster')(masterId)(master))

                    })
                }
                else {
                    return filter.function(formation)
                }});
        return formationList.filter(filterFunc);
      }, [formationList, filters]);
    
    return (
        <>
              <FilterForm onFilter={setFilters} />

            <ul>
                {filteredFormations.map((formation)=>
                    <FormationRow key={formation._id} formation={formation}></FormationRow>
                )}
            </ul>
        </>
    )
}
export default FormationList;
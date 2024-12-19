import { useDispatch, useSelector } from 'react-redux';
import FormationRow from './FormationRow';
import FilterForm from './FilterForm';
import { useMemo, useState } from 'react';
import { selectFormations } from '../features/formation/formationSelector';

function FormationList() {
    const [filters, setFilters] = useState([]); // State pour les filtres actifs
    const formationList = useSelector(selectFormations);
    const filteredFormations = useMemo(() => {
        if (filters.length === 0) return formationList; 
        const filterFunc = (formation) => filters.every((filter) => filter(formation));
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
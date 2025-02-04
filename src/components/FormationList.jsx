import { useDispatch, useSelector } from 'react-redux';
import FormationRow from './FormationRow';
import FilterForm from './FilterForm';
import { useEffect, useMemo, useState } from 'react';
import { selectFormations, selectMasters } from '../features/formation/formationSelector';
import { filterIncludes, filterIncludesArray } from '../utils/filters';

function FormationList() {
    const [filters, setFilters] = useState([]); // State pour les filtres actifs
    const formationList = useSelector(selectFormations);
    const masterList = useSelector(selectMasters);
    const [width, setWidth] = useState(window.innerWidth);

    //console.log(formationList);

    const filteredFormations = useMemo(() => {
        if (filters.length === 0) return formationList;
        const filterFunc = (formation) => filters.every((filter) => {
            if (filter.type === "master") {
                //filtre les formations en fonction de leur id master qui doit être celui donné dans le filtre
                return formation.masters.some((master) => filter.function(master))
            } else if (filter.type === "masterKeywords") {
                //filtre les formations en fonction des keyword de la formation rattachée grâce à l'id
                const filteredMasters = masterList.filter((master) => filter.function(master));
                console.log(filteredMasters);
                const filteredMastersId = filteredMasters.map((master) => master._idMaster);
                filteredMastersId.every((masterId) => {
                    return formation.masters.some((master) => filterIncludes('_idMaster')(masterId)(master))

                })
            }
            else {
                return filter.function(formation)
            }
        });
        return formationList.filter(filterFunc);
    }, [formationList, filters]);

    function handleResize() {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <>
            {width > 1024
                ?
                <div className='grid grid-cols-4 px-8'>
                    <FilterForm onFilter={setFilters} />

                    <ul className='col-span-3'>
                        {filteredFormations.map((formation) =>
                            <FormationRow key={formation._id} formation={formation}></FormationRow>
                        )}
                    </ul>
                </div>
                :
                <>
                    <FilterForm onFilter={setFilters} />

                    <ul>
                        {filteredFormations.map((formation) =>
                            <FormationRow key={formation._id} formation={formation}></FormationRow>
                        )}
                    </ul>
                </>
            }
        </>
    )
}
export default FormationList;
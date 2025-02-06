import { useDispatch, useSelector } from 'react-redux';
import FormationRow from './FormationRow';
import FilterForm from './FilterForm';
import { useEffect, useMemo, useState } from 'react';
import { selectFormations, selectMasters } from '../features/formation/formationSelector';
import { filterIncludes, filterIncludesArray } from '../utils/filters';
import { Grid } from '@mui/material';

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
                
                return filter.function(formation.masters);
            } else if (filter.type === "masterKeywords") {
                //filtre les formations en fonction des keyword de la formation rattachée grâce à l'id
                const filteredMasters = masterList.filter((master) => filter.function(master));
                console.log(filteredMasters);
                const filteredMastersId = filteredMasters.map((master) => master._id);
                console.log(formation.masters);
                
                return filteredMastersId.some((masterId) => 
                     
                    filterIncludes('_idMaster')(masterId)(formation.masters)
                );
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
        <Grid id='formation' container spacing={3} sx={{ px: 3, py: 2, mt: 6 }}>
            {width > 1024
                ?
                <>
                    {/* Sidebar des filtres */}
                    <Grid item xs={12} md={4} >
                        <FilterForm onFilter={setFilters} />
                    </Grid>

                    {/* Liste des formations */}
                    <Grid item xs={12} md={8}>
                        <ul className="flex flex-col gap-6 mt-3">
                            {filteredFormations.map((formation, id) => (
                                <FormationRow key={id} formation={formation} />
                            ))}
                        </ul>
                    </Grid>
                </>
                :
                <>
                {/* Filtres en haut sur mobile */}
                <Grid item xs={12}>
                    <FilterForm onFilter={setFilters} />
                </Grid>

                {/* Liste en dessous */}
                <Grid item xs={12}>
                    <ul className="flex flex-col gap-6 mt-3">
                        {filteredFormations.map((formation, id) => (
                            <FormationRow key={id} formation={formation} />
                        ))}
                    </ul>
                </Grid>
            </>
            }
        </Grid>
    )
}
export default FormationList;
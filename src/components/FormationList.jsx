import { useDispatch, useSelector } from 'react-redux';
import FormationRow from './FormationRow';
import FilterForm from './FilterForm';
import { useEffect, useMemo, useState } from 'react';
import { selectFormations } from '../features/formation/formationSelector';

function FormationList() {
    const [filters, setFilters] = useState([]); // State pour les filtres actifs
    const formationList = useSelector(selectFormations);
    const [width, setWidth] = useState(window.innerWidth);

    const filteredFormations = useMemo(() => {
        if (filters.length === 0) return formationList;
        const filterFunc = (formation) => filters.every((filter) => filter(formation));
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

                    <ul className="formations grid grid-cols-2 lg:grid-cols-1 gap-5 w-full lg:w-2/3 z-5">
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
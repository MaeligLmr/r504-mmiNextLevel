import { useDispatch, useSelector } from 'react-redux';
import Formation from './Formation';

function FormationList() {
      const [filters, setFilters] = useState([]); // State pour les filtres actifs

    const formationList = useSelector(selectFormations);
    const filteredFormations = useMemo(() => {
        if (filters.length === 0) return FormationList; 
        const filterFunc = (formation) => filters.every((formation) => filter(formation));
        return FormationList.filter(filterFunc);
      }, [formationList, filters]);
    
    return (
        <>
         
      {errorDel && (
          <Alert severity="error" sx={{ mb: 2, mx: 'auto', width: '80%' }}>
            {errorDel}
          </Alert>
        )}
              <FilterForm onFilter={setFilters} />

            <div>
                {filteredFormations.map((formation)=>
                    <Formation formation={formation}></Formation>
                )}
            </div>
        </>
    )
}
export default FormationList;
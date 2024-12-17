import logo from './logo.svg';
import './index.css'; // Import de Tailwind CSS
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadFormations } from './features/formation/formationAsyncAction';
import Accueil from './components/Accueil';
import { selectErrorLoad, selectFormations, selectLoading } from './features/formation/formationSelector';
import FormationList from './components/FormationList';


function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectErrorLoad);
  useEffect(() => {
    return () => {
      dispatch(loadFormations());
    };
  }, [dispatch]);
  return (
    <>
    <header>
      <h1>MMI NEXT LEVEL :)</h1>
    </header>
    <main>
    <Accueil></Accueil>
    {error && (
          <Alert severity="error" sx={{ mb: 2, mx: 'auto', width: '80%' }}>
            {error}
          </Alert>
        )}
        {loading ? (
          <p>Chargement des données </p>
        )
          :
          (
            <>
            
              <FormationList ></FormationList>
            </>
          )
        }
    </main>
    </>
  );
}

export default App;

import './index.css'; // Import de Tailwind CSS
import Accueil from './components/Accueil';
import AccueilAdmin from './components/admin/AccueilAdmin';
import { Route, Routes } from 'react-router-dom';
import Formation from './components/Formation';


function App() {
  
  return(
    <>
        <Routes>
          <Route path="/" exact element={<Accueil/>} />
          <Route path="/formation/:nom/:mention" exact element={<Formation/>} />
          <Route path="/admin" exact element={<AccueilAdmin/>} />
        </Routes>
    </>)
}

export default App;

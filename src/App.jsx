import { Route, Routes } from "react-router-dom";
import FormationList from "./components/FormationList";


function App(){

    return(
    <>
        <Routes>
          <Route exact path="/" element={<FormationList/>} />
        </Routes>
    </>)
};

export default App;
import { useEffect } from "react";
import { load } from "./features/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import UnivList from "./components/UnivList";
import {selectLoading} from './features/selector';

function App() {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);

    useEffect(()=>
    {
        dispatch(load());
    }, [dispatch])

    return(
        <main>
            <p>bndioboiesn</p>
        {
            loading
            ?
            <p>Chargement</p>
            
            :
            <UnivList/>
        }
        </main>
        
    )
}

export default App;
import { useEffect } from "react";
import { load } from "./features/asyncAction";

const { useDispatch, useSelector } = require("react-redux");
const { selectLoading } = require("./features/selector");
const { default: UnivList } = require("./components/UnivList");

function App() {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);

    useEffect(()=>
    {
        dispatch(load());
    }, [dispatch])

    return(
        <main>
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
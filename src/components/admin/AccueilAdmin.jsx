import { useEffect } from "react";
import { load } from "./features/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import UnivList from "./components/UnivList";
import {selectEdit, selectLoading} from './features/selector';
import { Typography } from "@mui/material";
import UnivForm from "./components/UnivForm";

function AccueilAdmin() {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const editing = useSelector(selectEdit);

    useEffect(()=>
    {
        dispatch(load());
    }, [dispatch])

    return(
        <main>
            <Typography variant="h2" component='h1' sx={{ mx:'auto', mb:'1.25rem'}}>Gestion des universités</Typography>
        {
            loading
            ?
            <p>Chargement</p>
            
            :
            <UnivList/>
        }
        {
            editing
            &&
            <UnivForm/>
        }
        </main>
        
    )
}

export default AccueilAdmin;
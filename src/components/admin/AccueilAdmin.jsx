import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UnivList from "./UnivList";
import { Typography } from "@mui/material";
import UnivForm from "./UnivForm";
import { selectEdit } from "../../features/admin/adminSelector";
import { loadFormations } from "../../features/formation/formationAsyncAction";
import { selectLoading } from "../../features/formation/formationSelector";

function AccueilAdmin() {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const editing = useSelector(selectEdit);

    useEffect(()=>
    {
        dispatch(loadFormations());
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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormationsList from "./FormationsList";
import { Typography } from "@mui/material";
import UnivForm from "./UnivForm";
import { selectEdit } from "../../features/admin/adminSelector";
import { loadFormations } from "../../features/formation/formationAsyncAction";
import { selectLoading } from "../../features/formation/formationSelector";
import { loadMasters } from "../../features/admin/adminAsyncAction";

function AccueilAdmin() {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const editing = useSelector(selectEdit);

    useEffect(()=>
    {
        dispatch(loadMasters());
        dispatch(loadFormations());
    }, [dispatch])

    return(
        <main>
            <Typography variant="h2" component='h1' sx={{ mx:'auto', mb:'1.25rem'}}>Gestion des formations</Typography>
        {
            loading
            ?
            <p>Chargement</p>
            
            :
            <FormationsList/>
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
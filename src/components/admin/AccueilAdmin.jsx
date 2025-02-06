import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormationsList from "./FormationsList";
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
            <header className="bg-[#5E3472] p-4 mb-4">
                <h1 className="text-white text-2xl">Gestion des formations</h1>
            </header>
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
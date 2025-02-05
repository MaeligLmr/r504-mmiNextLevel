import { Alert } from "@mui/material";
import FormationList from "./FormationList";
import { useDispatch, useSelector } from "react-redux";
import { selectErrorLoad, selectLoading } from "../features/formation/formationSelector";
import { useEffect } from "react";
import { loadFormations, loadMasters } from "../features/formation/formationAsyncAction";

function Accueil() {
    const scrollDown = () => {
        window.scrollBy({
            top: window.innerHeight, // Défiler de la hauteur de la fenêtre (100vh)
            left: 0,
            behavior: 'smooth', // Défiler de manière fluide
        });
    }
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectErrorLoad);
    useEffect(() => {
        return () => {
            dispatch(loadFormations());
            dispatch(loadMasters());
        };
    }, [dispatch]);


    return (
        <>
            <header className="flex items-center p-8 sticky top-0 z-100">
            <div class="logo text-xl font-bold max-w-16 bg-[#5E3472] p-3 rounded absolute right-4 top-4 z-5"><img src="/img/logo_menu.png" alt="logo MMINextLevel"/></div>
                
            </header>
            <main>
                <div className="h-screen max-h-screen bg-center bg-cover w-full">
                    <button onClick={scrollDown} aria-label="scroll down" className=" absolute bottom-2 left-1/2 bg-transparent">
                        <img width="100" height="100" src="/img/fleche_bas.svg" alt="flèche vers le bas"/>
                    </button>
                </div>
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
    )
}
export default Accueil;
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
            <header className="absolute top-2 left-1/2 translate-x-[-50%]">
                <h1>MMI NEXT LEVEL 😊</h1>
            </header>
            <main>
                <div className="h-screen w-screen">
                    <button onClick={scrollDown} aria-label="scroll down" className="w-7 h-5 absolute bottom-2 left-1/2 rounded-full bg-black border border-white"></button>
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
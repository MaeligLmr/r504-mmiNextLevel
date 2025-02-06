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
            <header className="flex h-auto items-center px-8 py-4 absolute top-4 right-0 left-0 z-50 bg-[#5E3472] rounded-md mx-4">
                <img className="logo w-12" src="/img/logo_menu.png" alt="logo MMINextLevel" />
            </header>
            <main>
                <div className="banner h-screen bg-center bg-cover w-full relative">
                    <h1 className="absolute top-1/3 right-2/4 text-6xl translate-x-1/2 text-[#5E3472] font-marker">Master après MMI</h1>
                    <button onClick={scrollDown} aria-label="scroll down" className=" absolute bottom-12 right-1/2 translate-x-1/2 bg-transparent">
                        <img width="100" height="100" src="/img/fleche_bas.svg" alt="flèche vers le bas" />
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
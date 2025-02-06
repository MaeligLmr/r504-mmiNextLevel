import { Alert } from "@mui/material";
import FormationList from "./FormationList";
import { useDispatch, useSelector } from "react-redux";
import { selectErrorLoad, selectLoading } from "../features/formation/formationSelector";
import { useEffect } from "react";
import { loadFormations, loadMasters } from "../features/formation/formationAsyncAction";
import Header from "./Header";
import { HashLink } from "react-router-hash-link";

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
            <Header className={'absolute top-4'} />
            <main>
                <div className="banner h-screen bg-center bg-cover w-full relative">
                    <h1 className="absolute top-1/3 right-2/4 text-6xl translate-x-1/2 text-[#5E3472] font-marker">Master après MMI</h1>
                    <button onClick={scrollDown} aria-label="scroll down" className="animate-bounce absolute bottom-12 right-1/2 translate-x-1/2 bg-transparent">
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
                <HashLink to="/#top">
                    <div className="fixed bottom-4 left-4 w-12 h-12 rounded-full border-[#5E3472] border-2 flex justify-center items-center bg-white">
                        <img className="w-6 rotate-180" src="/img/fleche_bas.svg" alt="remonter en haut de la page" />
                    </div>
                </HashLink>
            </main>
        </>
    )
}
export default Accueil;
import React from "react";
import { selectFormations, selectMasters } from '../features/formation/formationSelector';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { all } from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Formation() {
    const location = useLocation();
    const navigate = useNavigate();
    const formation = location.state?.formation;
    const masterList = useSelector(selectMasters);
    const idMaster = formation.masters._idMaster;
    const master = masterList.filter((master) => idMaster === master._id);

    return (
        <>
            <Header className={'mt-4'} />
            <div className="border-2 border-[#F39200] shadow-[-6px_6px_0_0_#F39200] px-12 py-6 my-8 mx-20 lg:mx-32 xl:mx-64 md:grid md:gap-5">
                <button onClick={() => navigate(-1)} type="button" class="top-0 right-0 mt-2 mr-2 p-2">
                    <img src="/img/fleche_retour.svg" alt="Retour" className="h-6 -rotate-90" />
                </button>
                <h3 className="text-xl font-bold text-gray-900">{formation.nom}</h3>
                <h4 className="text-lg font-semibold text-gray-700">Mention : {master[0].mention}</h4>
                <a target="_blank" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={`${formation.urlSite}`}>Site web de la formation</a>
                <ul className="md:grid md:grid-cols-2 md:gap-5">
                    <li>Région : {formation.region}</li>
                    <li>Ville : {formation.ville}</li>
                    {formation.masters.parcours.map((allParcours, id) => (
                        <div key={id}>
                            <p className="underline font-bold text-lg">Parcours : </p>
                            <a target="_blank" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={`${allParcours.urlParcours}`}><strong>{allParcours.nomParcours}</strong></a>
                            <p>Alternance : {allParcours.alternancePossible ? "Possible" : "Impossible"}</p>
                            <p>Distanciel : {allParcours.distanciel ? "Possible" : "Impossible"}</p>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    )
};

export default Formation;
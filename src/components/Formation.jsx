import React from "react";
import { selectFormations, selectMasters } from '../features/formation/formationSelector';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { all } from "axios";

function Formation(){
    const location = useLocation();
    const formation = location.state?.formation;
    const masterList = useSelector(selectMasters);
    const idMaster = formation.masters._idMaster;
    const master = masterList.filter((master) => idMaster === master._id);

    return(
        <>
            <div className="border-2 border-[#F39200] shadow-[-6px_6px_0_0_#F39200] p-6 m-6 grid gap-4">
                <button type="button" class="rotate-20 top-0 right-0 mt-2 mr-2 p-2">
                    <img src="./img/fleche_retour.svg" alt="Retour" className=" rotate-90 h-6 w-6" />
                </button>
                <h3 className="text-xl font-bold text-gray-900">{formation.nom}</h3>
                <h4 className="text-lg font-semibold text-gray-700">Mention : {master[0].mention}</h4>
                <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={`${formation.urlSite}`}>{formation.urlSite}</a>
                <ul className="grid grid-cols-2 gap-4">
                    <li>Région : {formation.region}</li>
                    <li>Ville : {formation.ville}</li>
                    {formation.masters.parcours.map((allParcours, id) => (
                        <div key={id}>
                            <p>Parcours</p>
                            <p><strong>{allParcours.nomParcours}</strong></p>
                            <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={`${allParcours.urlParcours}`}>{allParcours.urlParcours}</a>
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
import React from "react";
import { selectFormations } from '../features/formation/formationSelector';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function Formation({ formation }){
    const formationList = useSelector(selectFormations);

    return(
        <>
            <div className="border-black border-2 shadow-sm p-8 m-6 rounded-lg">
                <h3>{formation.nom}</h3>
                <h4>{formation.parcours.nomParcours}</h4>
                <p>{formation.urlSite}</p>
                <ul>
                    <li>{formation.region}</li>
                    <li>{formation.ville}</li>
                    <li>{formation.masters.parcours.anneeParcours}</li>
                    <li>{formation.masters.parcours.alternancePossible}</li>
                    <li>{formation.masters.parcours.enDistanciel}</li>
                    <li>{formation.masters.parcours.urlParcours}</li>
                </ul>
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Retour</button>
            </div>
        </>
    )
};

export default Formation;
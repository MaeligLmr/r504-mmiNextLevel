import React from "react";import { NavLink } from "react-router-dom";
import { selectFormations, selectMasters } from '../features/formation/formationSelector';
import { useSelector } from "react-redux";

function FormationRow({ formation }) {
    const masterList = useSelector(selectMasters);
    const idMaster = formation.masters._idMaster;
    const master = masterList.filter((master) => idMaster === master._id);
    
    return (
        <>
            <li className="border-black border-2 shadow-sm p-8 m-6 rounded-lg">
                <section className="my-6">
                    <h3>Mention : {master[0].mention}</h3>
                    <p>Etablissement : {formation.nom}</p>
                    <ul>Parcours :
                        {formation.masters.parcours.map((parc, id)=>
                        <li key={id}>{parc.nomParcours}</li>
                        )}
                    </ul>
                </section>
                <NavLink state={{formation}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={`/formation/${formation.nom}`}>Voir plus</NavLink>
            </li>
        </>
    )
};

export default FormationRow;
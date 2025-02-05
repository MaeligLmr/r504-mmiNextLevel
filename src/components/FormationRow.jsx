import React from "react";import { NavLink } from "react-router-dom";
import { selectFormations, selectMasters } from '../features/formation/formationSelector';
import { useSelector } from "react-redux";

function FormationRow({ formation }) {
    const masterList = useSelector(selectMasters);

    const borderColor = (parcours) => {
        switch (parcours) {
            case 'crea':
                return '#5E3472';
            case 'dev':
                return '#86BBD8';
            case 'strat': 
                return '#F39200';
            default:
                return '#000000';
        }
    }

    
    const idMaster = formation.masters._idMaster;
    const master = masterList.filter((master) => idMaster === master._id);
    
    return (
        <>
            <li key={index} className={`formation m-6 p-4 border-2 border-${borderColor(color.parcours)} shadow-[-6px_6px_0_0_${borderColor(color.parcours)}] flex flex-col items-start lg:flex-row lg:items-center`}>     
            <h2>
            Mention : {master[0].mention}
                </h2>
                <p>Etablissement : {formation.nom}</p>
                    <ul>Parcours :
                        {formation.masters.parcours.map((parc, id)=>
                        <li key={id}>{parc.nomParcours}</li>
                        )}</ul>
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Voir plus</button>
            </li>
        </>
    )
};

export default FormationRow;
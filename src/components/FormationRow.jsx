import React from "react";
import { selectFormations, selectMasters } from '../features/formation/formationSelector';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function FormationRow({ formation }) {
    const formationList = useSelector(selectFormations);
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


            <li  className={`formation mb-6 mx-4 p-4 border-2  flex flex-col items-start lg:flex-row lg:items-center`}>
                <section className="my-6">
                    <h3>Mention : {master[0].mention}</h3>
                    <p>Etablissement : {formation.nom}</p>

                    <ul>Parcours :
                        {formation.masters.parcours.map((parc, id) =>
                            <li key={id}>{parc.nomParcours}</li>
                        )}
                    </ul>
                    <NavLink state={{ formation }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={`/formation/${formation.nom}`}>Voir plus</NavLink>

                </section>
                        
        </li >
        
    )
};

export default FormationRow;
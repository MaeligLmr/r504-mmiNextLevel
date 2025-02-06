import React from "react";
import { selectFormations, selectMasters } from '../features/formation/formationSelector';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function FormationRow({ formation }) {
    const formationList = useSelector(selectFormations);
    const masterList = useSelector(selectMasters);
    console.log(formation)

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
                <section className="my-6 px-2 lg:mx-8 lg:w-full">
                    <h3 className="text-2xl">Mention {master[0].mention}</h3>
                    <p className="italic text-xl mb-4"> {formation.nom}</p>

                    <ul className="mb-4 pt-4 border-t-2 border-dashed border-[#E8DEEC]">Parcours :
                        {formation.masters.parcours.map((parc, id) =>
                            <li className="list-disc ml-8" key={id}>{parc.nomParcours}</li>
                        )}
                    </ul>
                    <div className="flex justify-end">
                    <NavLink state={{ formation }} className="transition-all bg-[#5E3472] hover:bg-[#E8DEEC] text-white hover:text-[#5E3472] font-bold py-2 px-4 rounded" to={`/formation/${formation.nom}`}>Voir plus</NavLink>
                    </div>
                </section>
                        
        </li >
        
    )
};

export default FormationRow;
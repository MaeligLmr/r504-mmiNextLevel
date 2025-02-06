import React, { useState } from "react";
import { selectMasters } from '../features/formation/formationSelector';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function FormationRow({ formation }) {
    const masterList = useSelector(selectMasters);
    const idMaster = formation.masters._idMaster;
    const master = masterList.find((master) => idMaster === master._id);

    const getClass = (parcours) => {
        var className = '';
        switch (parcours) {
            case 'crea':
                className ='border-[#5E3472] shadow-[-6px_6px_0_0_#5E3472]';
                break;
            case 'dev':
                className ='border-[#87BBD8] shadow-[-6px_6px_0_0_#87BBD8]';
                break;
            case 'strat':
                className ='border-[#F39200] shadow-[-6px_6px_0_0_#F39200]';
                break;
            default:
                className ='border-[#FFFFFF] shadow-[-6px_6px_0_0_#FFFFFF]';
        }
        return className;
    }

    return (
           <li className={`formation m-6 p-4 border-2 ${getClass(master.parcours)} flex flex-col items-start lg:flex-row lg:items-center`}>
                <section className="my-6 px-2 lg:mx-8 lg:w-full">
                    <h3 className="text-2xl">Mention {master.mention}</h3>
                    <p className="italic text-xl mb-4"> {formation.nom}</p>

                    <ul className="mb-4 pt-4 border-t-2 border-dashed border-[#E8DEEC]">Parcours :
                        {formation.masters.parcours.map((parc, id) =>
                            <li className="list-disc ml-8" key={id}>{parc.nomParcours}</li>
                        )}
                    </ul>
                    <div className="flex justify-end">
                    <NavLink state={{ formation }} className="transition-all bg-[#5E3472] hover:bg-[#E8DEEC] text-white hover:text-[#5E3472] font-bold py-2 px-4 rounded" to={`/formation/${formation.nom}/${master.mention}`}>Voir plus</NavLink>
                    </div>
                </section>
                        
        </li >
        
    )
};

export default FormationRow;
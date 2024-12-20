import React from "react";
import { selectFormations, selectMasters } from '../features/formation/formationSelector';
import { useSelector } from "react-redux";

function FormationRow({ formation }){
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

    return(
        <>
        <li>
            {masterList.map((color, index) => (
                <li key={index} className={`formation m-6 p-4 border-2 border-${borderColor(color.parcours)} shadow-[-6px_6px_0_0_${borderColor(color.parcours)}] flex flex-col items-start lg:flex-row lg:items-center`}>     
                    <h2>
                        {masterList.map((master)=>{
                            console.log(master.mention);
                            return master.mention
                        })}
                    </h2>
                    <h3>{formation.nom}</h3>
                    <ul>
                        <li>{formation.urlSite}</li>
                        <li>{formation.ville}</li>
                        <li>{formation.region}</li>
                        {formationList.map((formation) => {
                            <li>
                                {formation.masters.map((allParcours)=>{
                                    allParcours.parcours.map((nom)=>{
                                    return nom.nomParcours;
                                    })
                                })}
                            </li>
                        })}
                    </ul>
                    <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Voir plus</button>
                </li>
            ))}
            </li>
        </>
    )
};

export default FormationRow;
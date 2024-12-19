import React from "react";
import { selectFormations, selectMasters } from '../features/formation/formationSelector';
import { useSelector } from "react-redux";

function Formation({ formation }){
    const formationList = useSelector(selectFormations);
    const masterList = useSelector(selectMasters);

    return(
        <>
            <div className="border-black border-2 shadow-sm p-8 m-6 rounded-lg">
                <h2>
                    {masterList.map((master)=>{
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
            </div>
        </>
    )
};

export default Formation;
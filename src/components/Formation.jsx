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
                <h4 className="text-lg font-semibold text-gray-700">
                    {formation.masters.map((allParcours)=>{
                        allParcours.parcours.map((nom)=>{
                            return nom.nomParcours;
                        })
                    })}
                </h4>
                <ul className="grid grid-cols-2 gap-4">
                    <li>Région : {formation.region}</li>
                    <li>Ville : {formation.ville}</li>
                    <li>
                        {formation.masters.map((allParcours)=>{
                            allParcours.parcours.map((annees)=>{
                                return annees.anneesParcours;
                            })
                        })}
                    </li>
                    <li>
                    Alternance :
                        {formation.masters.map((allParcours)=>{
                            allParcours.parcours.map((alternance)=>{
                                return allParcours.alternance ? "Possible" : "Impossible";
                            })
                        })}
                    </li>
                    <li>
                        Distanciel : 
                        {formation.masters.map((allParcours)=>{
                            allParcours.parcours.map((distanciel)=>{
                                return distanciel.enDistanciel ? "Possible" : "Impossible";
                            })
                        })}
                    </li>
                    <li><a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={`${formation.masters.map((allParcours)=>{
                            allParcours.parcours.map((urlParcours)=>{
                                return urlParcours.urlParcours;
                            })
                        })}`}>
                        {formation.masters.map((allParcours)=>{
                            allParcours.parcours.map((urlParcours)=>{
                                return urlParcours.urlParcours;
                            })
                        })}</a>
                    </li>
                </ul>
            </div>
        </>
    )
};

export default Formation;
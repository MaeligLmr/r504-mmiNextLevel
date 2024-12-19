import React from "react";
import { selectFormations } from '../features/formation/formationSelector';
import { useSelector } from "react-redux";

function Formation({ formation }){

    return(
        <>
            <div className="border-black border-2 shadow-sm p-8 m-6 rounded-lg">
                <h3>{formation.nom}</h3>
                <h4>
                    {formation.masters.map((allParcours)=>{
                        allParcours.parcours.map((nom)=>{
                            return nom.nomParcours;
                        })
                    })}
                </h4>
                <p>{formation.urlSite}</p>
                <ul>
                    <li>{formation.region}</li>
                    <li>{formation.ville}</li>
                    <li>
                        {formation.masters.map((allParcours)=>{
                            allParcours.parcours.map((annees)=>{
                                return annees.anneesParcours;
                            })
                        })}
                    </li>
                    <li>
                        {formation.masters.map((allParcours)=>{
                            allParcours.parcours.map((alternance)=>{
                                return alternance.alternancePossible;
                            })
                        })}
                    </li>
                    <li>
                        {formation.masters.map((allParcours)=>{
                            allParcours.parcours.map((distanciel)=>{
                                return distanciel.enDistanciel;
                            })
                        })}
                    </li>
                    <li>
                        {formation.masters.map((allParcours)=>{
                            allParcours.parcours.map((urlParcours)=>{
                                return urlParcours.urlParcours;
                            })
                        })}
                    </li>
                </ul>
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Retour</button>
            </div>
        </>
    )
};

export default Formation;
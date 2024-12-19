import React from "react";
import { selectFormations, selectMasters } from '../features/formation/formationSelector';
import { useSelector } from "react-redux";

function FormationRow({ formation }){
    const formationList = useSelector(selectFormations);
    const masterList = useSelector(selectMasters);
    
    const master = formation.masters.map(master => master._idMaster);
    const mention = masterList.filter((mention)=>master.includes(mention._id));

    return(     
        <>
            <div className="border-black border-2 shadow-sm p-8 m-6 rounded-lg">
                { mention ? 
                    (
                        <h2>
                            Mention : 
                            {mention.map((element, index) => (
                                <div key={index}>{element.mention}</div>
                            ))}
                        </h2>
                    ) : (
                        <h2>Mention non trouvé !</h2>
                    )
                }
                <h3>{formation.nom}</h3>
                <ul>
                    <li><a href={`${formation.urlSite}`}>{formation.urlSite}</a></li>
                    <li>{formation.ville}</li>
                    <li>{formation.region}</li>
                </ul>
                {formation.masters.map((allParcours, index)=>(
                    <ul key={index}>
                        {allParcours.parcours.map((nom, index)=>{
                            return <li key={index}>{nom.nomParcours}</li>
                        })}
                    </ul>
                ))}
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Voir plus</button>
            </div>
        </>
    )
};

export default FormationRow;
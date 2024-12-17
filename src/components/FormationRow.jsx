import React from "react";
import { selectFormations } from '../features/formation/formationSelector';

function Formation({ formation }){
    const formationList = useSelector(selectFormations);

    return(
        <>
            <div className="border-black border-2 shadow-sm p-8 m-6 rounded-lg">
                <h2>{master.mention}</h2>{/* A changer en reprenant le nom de la mention concerné*/}
                <h3>{formation.nom}</h3>
                <ul>
                    <li>{formation.urlSite}</li>
                    <li>{formation.ville}</li>
                    <li>{formation.region}</li>
                    {formationList.map((formation) => <li>{formation.parcours.nomParcours}</li>)}
                </ul>
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><Link to={`/${formation.nom}/${formation.masters.parcours.nomParcours}`}>Voir plus</Link></button>
            </div>
        </>
    )
};

export default Formation;
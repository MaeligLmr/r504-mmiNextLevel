import React from "react";
import { selectFormations } from '../features/formation/formationSelector';

function Formation({ formation }){
    const formationList = useSelector(selectFormations);
    const [isShowMore, setShowMore] = useState(false);

    return(
        <>
            <div className="border-black border-2 shadow-sm p-8 m-6">
                <h2>{formation.nom}</h2>
                <h3>{formation.nom}</h3>
                <ul>
                    {formationList.map((formation) => <li>{formation.parcours.nomParcours}</li>)}
                </ul>
                <button type='button' onClick={() => setShowMore(!isShowMore)} >
                    {isShowMore && 
                        <>
                            {formation.urlSite}
                            {formation.region}
                            {formation.ville}
                            {formation.masters.parcours.enDistanciel}
                        </>
                    }
                </button>
            </div>
        </>
    )
};

export default Formation;
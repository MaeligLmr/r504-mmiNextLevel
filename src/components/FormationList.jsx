import { useDispatch, useSelector } from 'react-redux';
import Formation from './Formation';

function FormationList() {
    const dispatch = useDispatch();
    const formationList = useSelector(selectFormations);

    return (
        <>
            <div>
                {formationList.map((formation)=>
                    <Formation formation={formation}></Formation>
                )}
            </div>
        </>
    )
}
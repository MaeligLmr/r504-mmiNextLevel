import { useDispatch, useSelector } from "react-redux";
import { selectFormations } from "../features/selector";

function UnivList() {
    const univs = useSelector(selectFormations);
    const dispatch = useDispatch();

    return(
        <>
            {
                univs.map((university)=> <div>{university.nom}</div>)
            }
        </>
    )
}

export default UnivList;
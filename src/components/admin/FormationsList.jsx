import { useDispatch, useSelector } from "react-redux";
import { selectFormations } from "../../features/admin/adminSelector";
import { List } from "@mui/material";
import Item from "./Item";

function FormationsList() {
    const formations = useSelector(selectFormations);
    const dispatch = useDispatch();

    return (
        <List>
            {
                formations.map((formation, id) =>
                    <Item key={id} formation={formation}/>
                )
            }
        </List>
    )
}

export default FormationsList;
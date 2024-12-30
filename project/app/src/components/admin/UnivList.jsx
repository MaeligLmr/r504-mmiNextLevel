import { useDispatch, useSelector } from "react-redux";
import { selectFormations } from "../../features/admin/adminSelector";
import { List } from "@mui/material";
import Item from "./Item";

function UnivList() {
    const univs = useSelector(selectFormations);
    const dispatch = useDispatch();

    return (
        <List>
            {
                univs.map((university, id) =>
                    <Item key={id} univ={university}/>
                )
            }
        </List>
    )
}

export default UnivList;
import { useDispatch, useSelector } from "react-redux";
import { selectFormations } from "../features/selector";
import { List, ListItem } from "@mui/material";
import Item from "./Item";

function UnivList() {
    const univs = useSelector(selectFormations);
    const dispatch = useDispatch();

    return (
        <List>
            {
                univs.map((university, id) =>
                    <ListItem key={id}>
                        <Item univ={university}/>
                    </ListItem>
                )
            }
        </List>
    )
}

export default UnivList;
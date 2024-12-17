import { Button, ListItem, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { startEdit } from "../features/slice";

function Item({ univ }) {

    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(startEdit(univ.id));
    };

    return (
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.5rem pink solid" }}>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>{univ.nom}</Typography>
            <Button aria-label="Modifier" onClick={handleEdit}>Modifier</Button>
        </ListItem>
    )
}

export default Item;
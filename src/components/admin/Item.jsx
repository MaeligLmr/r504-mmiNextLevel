import { Button, ListItem, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { startEdit } from "../features/slice";

function Item({ univ }) {

    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(startEdit(univ._id));
    };

    return (
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: "2px grey solid" }}>
            <Typography sx={{ fontSize: "1rem" }}>{univ.nom}</Typography>
            <Button aria-label="Modifier" variant='contained' color="info" onClick={handleEdit}>Modifier</Button>
        </ListItem>
    )
}

export default Item;
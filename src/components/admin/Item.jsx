import { Button, ListItem, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { startEdit } from "../../features/admin/adminSlice";

function Item({ formation }) {

    const dispatch = useDispatch();

    console.log(formation);
    const handleEdit = () => {
        dispatch(startEdit(formation._id));
    };

    return (
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: "2px grey solid" }}>
            <Typography sx={{ fontSize: "1rem" }}>{formation.nom}</Typography>
            <Button aria-label="Modifier" variant='contained' color="info" onClick={handleEdit}>Modifier</Button>
        </ListItem>
    )
}

export default Item;
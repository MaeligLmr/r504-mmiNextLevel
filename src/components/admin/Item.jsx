import { Button, ListItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { startEdit } from "../../features/admin/adminSlice";
import { selectMasters } from "../../features/admin/adminSelector";

function Item({ formation }) {
    const masters = useSelector(selectMasters);

    function displayMasterName(){
        const master = masters.find((master) => master._id == formation.masters._idMaster);
        return (
            <Typography sx={{ fontSize: "1rem", maxWidth: "500px", overflow:"hidden", whiteSpace:"nowrap", textOverflow: "ellipsis" }}>{master.mention}</Typography>
        )
    };

    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(startEdit(formation.idFormation));
    };

    return (
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: "2px grey solid" }}>
            { displayMasterName() }
            <Typography sx={{ fontSize: "1rem" }}>{formation.nom}</Typography>
            <Button aria-label="Modifier" variant='contained' color="info" onClick={handleEdit}>Modifier</Button>
        </ListItem>
    )
}

export default Item;
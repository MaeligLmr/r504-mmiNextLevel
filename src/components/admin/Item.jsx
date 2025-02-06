import { Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { startEdit } from "../../features/admin/adminSlice";
import { selectMasters } from "../../features/admin/adminSelector";

function Item({ formation }) {
    const masters = useSelector(selectMasters);

    function displayMasterName(){
        const master = masters.find((master) => master._id == formation.masters._idMaster);
        return (
            <Typography sx={{ fontSize: "1.25rem", maxWidth: "500px", overflow:"hidden", whiteSpace:"nowrap", textOverflow: "ellipsis" }}>{master.mention}</Typography>
        )
    };

    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(startEdit(formation._id));
    };

    return (
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: "column", gap: "0.5rem"}}>
            { displayMasterName() }
            <Typography sx={{ fontSize: "1rem", fontStyle: "italic" }}>{formation.nom}</Typography>
            <Button sx={{width: "fit-content", backgroundColor: "#5E3472"}} className="hover:bg-[#EDE9F0] hover:text-black" aria-label="Modifier" variant='contained' onClick={handleEdit}>Modifier</Button>
        </Grid>
    )
}

export default Item;
import { Typography } from "@mui/material";

function Item({univ}) {
    return(
    <>
        <Typography>{univ.nom}</Typography>
    </>)
}

export default Item;
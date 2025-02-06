import { useSelector } from "react-redux";
import { selectFormations } from "../../features/admin/adminSelector";
import Item from "./Item";
import { Grid } from "@mui/material";

function FormationsList() {
    const formations = useSelector(selectFormations);

    return (
        <Grid container className="px-6" rowSpacing={5}>
            {
                formations.map((formation, id) =>
                    <Item key={id} formation={formation}/>
                )
            }
        </Grid>
    )
}

export default FormationsList;
import { Button, Dialog, DialogContent, DialogTitle, Grid2, TextField } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectEditID, selectFormations, selectInitialFormValues } from '../../features/admin/adminSelector';
import { updateFormation } from '../../features/admin/adminAsyncAction';
import { stopEdit } from '../../features/admin/adminSlice';


function UnivForm() {
    const univs = useSelector(selectFormations);
    const editID = useSelector(selectEditID);
    const initialValues = useSelector(selectInitialFormValues);
    const dispatch = useDispatch();
    
    const handleSubmit = async (values, form) => {
        dispatch(updateFormation(values));
    };

    const handleExit = () => {
        dispatch(stopEdit());
    }

    function displayMasters() {
        return (
            <>
                {
                    initialValues.masters.map((master, id) => {
                        if (master.urlMaster) {
                            return (
                                <Field
                                    key={id}
                                    name={master.urlMaster}
                                    render={({ input, meta }) => (
                                        <TextField
                                            {...input}
                                            variant="outlined"
                                            label="URL du site"
                                            fullWidth
                                            value={input.value}
                                        />
                                    )}
                                />)
                        }
                    })
                }
            </>
        )
    }

    return (
        <Dialog open={true} onClose={handleExit}>
            <DialogTitle sx={{ textAlign: 'center' }}>Modifier une Université</DialogTitle>
            <DialogContent>
                <Form
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid2 container>
                                <Field
                                    name='nom'
                                    render={({ input, meta }) => (
                                        <TextField
                                            {...input}
                                            variant="outlined"
                                            label="Nom"
                                            fullWidth
                                            value={input.value}
                                        />
                                    )}
                                >
                                </Field>
                                <Field
                                    name='urlSite'
                                    render={({ input, meta }) => (
                                        <TextField
                                            {...input}
                                            variant="outlined"
                                            label="URL du site"
                                            fullWidth
                                            value={input.value}
                                        />
                                    )}
                                >
                                </Field>
                                <Field
                                    name='ville'
                                    render={({ input, meta }) => (
                                        <TextField
                                            {...input}
                                            variant="outlined"
                                            label="Ville"
                                            fullWidth
                                            value={input.value}
                                        />
                                    )}
                                >
                                </Field>
                                <Field
                                    name='region'
                                    render={({ input, meta }) => (
                                        <TextField
                                            {...input}
                                            variant="outlined"
                                            label="Région"
                                            fullWidth
                                            value={input.value}
                                        />
                                    )}
                                >
                                </Field>
                                {
                                    displayMasters()
                                }
                                <Button onClick={handleExit} aria-label='annuler'>Annuler</Button>
                                <Button type='submit' aria-label='enregistrer'>Enregistrer</Button>
                            </Grid2>
                        </form>
                    )}
                ></Form>
            </DialogContent>
        </Dialog>
    )
}

export default UnivForm;
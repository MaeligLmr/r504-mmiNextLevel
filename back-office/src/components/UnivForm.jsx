import { Button, Dialog, DialogContent, DialogTitle, Grid2, TextField } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { stopEdit } from '../features/slice';

function UnivForm() {
    const dispatch = useDispatch();

    function handleExit() {
        dispatch(stopEdit());
    }
    function handleSubmit() {

    }

    return (
        <Dialog open={true} onClose={handleExit}>
            <DialogTitle sx={{textAlign:'center'}}>Modifier une Université</DialogTitle>
            <DialogContent>
                <Form
                    initialValues=''
                    onSubmit={handleSubmit}
                    render={({ handleSubmit }) => (
                        <form>
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
                            </Grid2>
                        </form>
                    )}
                ></Form>
                <Button onClick={handleExit} aria-label='annuler'>Annuler</Button>
            </DialogContent>
        </Dialog>
    )
}

export default UnivForm;
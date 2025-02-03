import { Button, Dialog, DialogContent, DialogTitle, Grid2, TextField } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectEditID, selectFormations, selectInitialFormValues } from '../../features/admin/adminSelector';
import { updateFormation } from '../../features/admin/adminAsyncAction';
import { stopEdit } from '../../features/admin/adminSlice';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

function UnivForm() {
    const univs = useSelector(selectFormations);
    const editID = useSelector(selectEditID);

    // On charge le formulaire avec les valeurs de l'établissement sélectionné
    const initialValues = useSelector(selectInitialFormValues);
    const dispatch = useDispatch();

    // Fonction d'enregistrement des modifications
    const handleSubmit = async (values, form) => {
        dispatch(updateFormation(values));
    };

    const handleExit = () => {
        dispatch(stopEdit());
    }

    console.log(initialValues);

    return (
        <Dialog open={true} onClose={handleExit}>
            <DialogTitle sx={{ textAlign: 'center' }}>Modifier une Université</DialogTitle>
            <DialogContent>
                <Form
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    mutators={{ ...arrayMutators }}
                    render={({
                        handleSubmit,
                        form: {
                            mutators: { push, pop }
                        } }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid2 container sx={{ gap: '20px', marginTop: '10px' }}>
                                {/* Nom de l'établissement */}
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

                                {/* Site Web de l'établissement */}
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

                                {/* Ville */}
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

                                {/* Région */}
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

                                <FieldArray name={"masters"}>
                                    {({ fields }) => (
                                        <div>
                                            {fields.map((name, id) => {
                                                <div key={name}>
                                                    {/* ID du master */}
                                                    <Field
                                                        name='_idMaster'
                                                        render={({ input, meta }) => (
                                                            <TextField
                                                                {...input}
                                                                variant="outlined"
                                                                label="ID Master"
                                                                fullWidth
                                                                value={input.value}
                                                            />
                                                        )}
                                                    />

                                                    {/* URL du master */}
                                                    <Field
                                                        name='urlMaster'
                                                        render={({ input, meta }) => (
                                                            <TextField
                                                                {...input}
                                                                variant="outlined"
                                                                label="URL Master"
                                                                fullWidth
                                                                value={input.value}
                                                            />
                                                        )}
                                                    />

                                                    {/* Bouton de suppression du master */}
                                                    <span
                                                        onClick={() => fields.remove(id)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        ❌
                                                    </span>
                                                </div>

                                                // key={id}
                                                // name={"urlMaster" + id}
                                                // render={({ input, meta }) => (
                                                //     <TextField
                                                //         {...input}
                                                //         variant="outlined"
                                                //         label="URL du site"
                                                //         fullWidth
                                                //         value={master.urlMaster}
                                                //     />
                                                // )}
                                            })}

                                            {/* Boutons d'ajout et de suppression de masters */}
                                            <div className="buttons">
                                                <button
                                                    type="button"
                                                    onClick={() => push({ fields, undefined })}
                                                >
                                                    Ajouter un master
                                                </button>
                                                <button type="button" onClick={() => pop(fields)}>
                                                    Supprimer un master
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </FieldArray>

                                {/* Boutons d'action */}
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
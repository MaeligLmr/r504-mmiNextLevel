import { Button, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid2, Switch, TextField, Typography } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectEditID, selectFormations, selectInitialFormValues, selectMasters } from '../../features/admin/adminSelector';
import { updateFormation } from '../../features/admin/adminAsyncAction';
import { stopEdit } from '../../features/admin/adminSlice';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import { useEffect, useState } from 'react';

function UnivForm() {
    const univs = useSelector(selectFormations);
    const editID = useSelector(selectEditID);
    const masters = useSelector(selectMasters);

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

    const getMaster = () => {
        return masters.find((master) => master._id == initialValues.masters._idMaster);
    };

    return (
        <Dialog open={true} onClose={handleExit}>
            <DialogTitle sx={{ textAlign: 'center' }}>Modifier une Formation</DialogTitle>
            <DialogContent>
                <Typography sx={{ fontSize: "1rem" }}>Mention : {getMaster().mention}</Typography>
                <Typography sx={{ fontSize: "1rem" }}>Université : {initialValues.nom}</Typography>
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
                            <Grid2 container sx={{ gap: '20px', marginTop: '30px' }}>
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

                                {/* Site Web de la mention */}
                                <Field
                                    name='masters.urlMaster'
                                    render={({ input, meta }) => (
                                        <TextField
                                            {...input}
                                            variant="outlined"
                                            label="URL du Master"
                                            fullWidth
                                            value={input.value}
                                        />
                                    )}
                                >
                                </Field>

                                {/* Liste des parcours */}
                                <Typography sx={{ fontSize: "1rem" }}>Liste des parcours</Typography>

                                {/* {initialValues
                                    .masters
                                    .parcours
                                    .map((parcours, id) => {
                                        return (
                                            <>
                                                <Field
                                                    name={`masters.parcours[${id}].nomParcours`}
                                                    key={id}
                                                    render={({ input, meta }) => (
                                                        <TextField
                                                            {...input}
                                                            variant="outlined"
                                                            label="Nom du Parcours"
                                                            fullWidth
                                                            value={input.value}
                                                        />
                                                    )}>
                                                </Field>
                                                <Field
                                                    key={id + 1}
                                                    name={`masters.parcours[${id}].alternancePossible`}
                                                    render={({ input, meta }) => (
                                                        <FormControlLabel
                                                            control={
                                                                {
                                                                    ...parcours.alternancePossible
                                                                        ?
                                                                        <Switch defaultChecked />
                                                                        :
                                                                        <Switch />
                                                                }
                                                            }
                                                            label="Alternance" />
                                                    )}>
                                                </Field>
                                                <Field
                                                    name={`masters.parcours[${id}].urlParcours`}
                                                    key={id + 2}
                                                    render={({ input, meta }) => (
                                                        <TextField
                                                            {...input}
                                                            variant="outlined"
                                                            label="URL du Parcours"
                                                            fullWidth
                                                            value={input.value}
                                                        />
                                                    )}>
                                                </Field>
                                            </>
                                        )
                                    }
                                    )} */}

                                {/* Ajouter un parcours */}
                                {/* <Field
                                    name='newParcours'
                                    render={({ input, meta }) => (
                                        <TextField
                                            variant="outlined"
                                            label="Nouveau parcours"
                                            fullWidth
                                        />
                                    )}
                                >
                                </Field> */}

                                <FieldArray name={"parcours"}>
                                    {({ fields }) => (
                                        <div>
                                            {fields.map((name, id) => {
                                                <div key={name}>
                                                    {/* nom du parcours*/}
                                                    <Field
                                                        name={`${name}.nomParcours`}
                                                        render={({ input, meta }) => (
                                                            <TextField
                                                                {...input}
                                                                variant="outlined"
                                                                label="Nom du parcours"
                                                                fullWidth
                                                                value={input.value}
                                                            />
                                                        )}
                                                    />

                                                    {/* Alternance possible ou non */}
                                                    <Field
                                                        name={`${name}.alternancePossible`}
                                                        render={({ input, meta }) => (
                                                            <TextField
                                                                {...input}
                                                                variant="outlined"
                                                                label="Alternance"
                                                                fullWidth
                                                                value={input.value}
                                                            />
                                                        )}
                                                    />

                                                    {/* Bouton de suppression du parcours*/}
                                                    <span
                                                        onClick={() => fields.remove(id)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        ❌
                                                    </span>
                                                </div>
                                            })}

                                            {/* Boutons d'ajout de parcours*/}
                                            <div className="buttons">
                                                <button
                                                    type="button"
                                                    onClick={() => push('')}
                                                >
                                                    Ajouter un parcours
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
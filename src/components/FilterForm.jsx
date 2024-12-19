import React from 'react';
import { Form, Field } from 'react-final-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Grid2, Typography} from '@mui/material';
import {filterIncludes, filterBoolean} from '../utils/filters'
 // pour l'instant ville, region et mention sont des textfield, penser à les mettre en menu déroulant
const FilterForm = ({ onFilter }) => {
  const handleSubmit = (values) => {
    const activeFilters = [];

    // Ajout des fonctions de filtre
    if (values.mention) {
      activeFilters.push(filterIncludes('mention')(values.mention));
    }
    if (values.region) {
      activeFilters.push(filterIncludes('region')(values.region));
    }
    if (values.ville) {
      activeFilters.push(filterIncludes('ville')(values.ville));
    }
    if (values.alternance !== undefined) {
      activeFilters.push(filterBoolean('alternance')(values.alternance));
    }
    if (values.distanciel !== undefined) {
      activeFilters.push(filterBoolean('distanciel')(values.distanciel));
    }

    // Appel de la fonction onFilter avec les filtres actifs
    onFilter(activeFilters);
  };

  const handleReset = (form) => {
    form.reset();
    onFilter([]); // Réinitialiser les filtres
  };

  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit} onReset={() => handleReset(form)}>
          <Box component="fieldset" sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px' }}>
            <Typography component="legend" variant="h6" sx={{ mb: 2 }}>
              Filtres
            </Typography>

            <Grid2 container spacing={3}>
              {/* Mention */}
              <Grid item xs={12} sm={6}>
                <Field
                  name="mention"
                  render={({ input }) => (
                    <TextField
                      {...input}
                      label="Mention"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>

              {/* Région */}
              <Grid item xs={12} sm={6}>
                <Field
                  name="region"
                  render={({ input }) => (
                    <TextField
                      {...input}
                      label="Région"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>

              {/* Ville */}
              <Grid item xs={12} sm={6}>
                <Field
                  name="ville"
                  render={({ input }) => (
                    <TextField
                      {...input}
                      label="Ville"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>

              {/* Alternance possible */}
              <Grid item xs={12} sm={6}>
                <Field
                  name="alternance"
                  type="checkbox"
                  render={({ input }) => (
                    <FormControlLabel
                      control={<Checkbox {...input} />}
                      label="Alternance possible"
                    />
                  )}
                />
              </Grid>

              {/* Distanciel */}
              <Grid item xs={12} sm={6}>
                <Field
                  name="distanciel"
                  type="checkbox"
                  render={({ input }) => (
                    <FormControlLabel
                      control={<Checkbox {...input} />}
                      label="Distanciel"
                    />
                  )}
                />
              </Grid>
            </Grid2>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                Appliquer filtre
              </Button>
              <Button type="reset" variant="outlined" color="secondary">
                Réinitialiser filtre
              </Button>
            </Box>
          </Box>
        </form>
      )}
    />
  );
};

export default FilterForm;

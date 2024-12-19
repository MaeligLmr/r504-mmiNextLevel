import React from 'react';
import { Form, Field } from 'react-final-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MenuItem, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import { filterIncludes, filterBoolean } from '../utils/filters';
import { selectMasters, selectRegions } from '../features/formation/formationSelector';
import { useSelector } from 'react-redux';
import { Construction } from '@mui/icons-material';

const FilterForm = ({ onFilter }) => {
  const masterList = useSelector(selectMasters);
  const regionList = useSelector(selectRegions);

  const handleSubmit = (values) => {
    const activeFilters = [];

    if (values.mention) {
      activeFilters.push({function : filterIncludes('_idMaster')(values.mention), type : "master"});
    }
    if (values.region) {
      activeFilters.push({function : filterIncludes('region')(values.region), type : "formation"});
    }
    if (values.alternance !== undefined) {
      activeFilters.push({function : filterBoolean('alternance')(values.alternance), type : "formation"});
    }
    if (values.distanciel !== undefined) {
      activeFilters.push({function : filterBoolean('distanciel')(values.distanciel), type : "formation"});
    }

    onFilter(activeFilters);
  };

  const handleReset = (form) => {
    form.reset();
    onFilter([]);
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
                <Field name="mention">
                  {({ input }) => (
                    <Select
                      {...input}
                      fullWidth
                      variant="outlined"
                      displayEmpty
                      defaultValue=""
                    >
                      <MenuItem value="">
                        Mention
                      </MenuItem>
                      {masterList.map((master, index) => (
                        <MenuItem key={index} value={master._id}>
                          {master.mention}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </Field>
              </Grid>

              {/* Région */}
              <Grid item xs={12} sm={6}>
              <Field name="region">
                  {({ input }) => (
                    <Select
                      {...input}
                      fullWidth
                      variant="outlined"
                      displayEmpty
                      defaultValue=""
                    >
                      <MenuItem value="">
                        Region
                      </MenuItem>
                      {regionList.map((region, index) => (
                        <MenuItem key={index} value={region}>
                          {region}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </Field>
              </Grid>

              {/* Ville */}
            

              {/* Alternance possible */}
              <Grid item xs={12} sm={6}>
                <Field name="alternance" type="checkbox">
                  {({ input }) => (
                    <FormControlLabel
                      control={<Checkbox {...input} />}
                      label="Alternance possible"
                    />
                  )}
                </Field>
              </Grid>

              {/* Distanciel */}
              <Grid item xs={12} sm={6}>
                <Field name="distanciel" type="checkbox">
                  {({ input }) => (
                    <FormControlLabel
                      control={<Checkbox {...input} />}
                      label="Distanciel"
                    />
                  )}
                </Field>
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

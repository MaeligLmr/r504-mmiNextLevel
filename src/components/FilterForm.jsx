import React from 'react';
import { Form, Field } from 'react-final-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Autocomplete, MenuItem, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import { filterIncludes, filterBoolean } from '../utils/filters';
import { selectKeywords, selectMasters, selectRegions } from '../features/formation/formationSelector';
import { useSelector } from 'react-redux';

const FilterForm = ({ onFilter }) => {
  const masterList = useSelector(selectMasters);
  const regionList = useSelector(selectRegions);
  const keywords = useSelector(selectKeywords);

  const handleSubmit = (values) => {
    const activeFilters = [];
    if (values.keywords && values.keywords.length > 0) {
      values.keywords.forEach((keyword) =>
        activeFilters.push({ function: filterIncludes('competences')(keyword), type: 'masterKeywords' })
      );
    }
    if (values.mention) {
      activeFilters.push({ function: filterIncludes('_idMaster')(values.mention), type: "master" });
    }
    if (values.region) {
      activeFilters.push({ function: filterIncludes('region')(values.region), type: "formation" });
    }
    if (values.alternance !== undefined) {
      activeFilters.push({ function: filterBoolean('alternancePossible')(values.alternance), type: "formation" });
    }
    if (values.distanciel !== undefined) {
      activeFilters.push({ function: filterBoolean('distanciel')(values.distanciel), type: "formation" });
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
          <Grid container spacing={3}>
            {/* Sidebar des filtres */}
            <Grid item xs={12}>
              <Box
                component="fieldset"
                sx={{
                  p: 3,
          
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  height: '100%',
                  position: 'sticky',
                  top: 20,
                }}
              >
                <Typography component="legend" variant="h6" sx={{ mb: 2 }}>
                  Filtres
                </Typography>

                <Grid container spacing={2} direction="column">
                  {/* Recherche */}
                  <Grid item xs={12}>
                    <Field name="keywords">
                      {({ input }) => (
                        <Autocomplete
                          multiple
                          options={keywords}
                          onChange={(event, newValue) => input.onChange(newValue)}
                          renderInput={(params) => (
                            <TextField {...params} label="Recherche" variant="outlined" fullWidth />
                          )}
                        />
                      )}
                    </Field>
                  </Grid>

                  {/* Mention */}
                  <Grid item xs={12}>
                    <Field name="mention">
                      {({ input }) => (
                        <Select {...input} fullWidth variant="outlined" displayEmpty>
                          <MenuItem value="">Mention</MenuItem>
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
                  <Grid item xs={12}>
                    <Field name="region">
                      {({ input }) => (
                        <Select {...input} fullWidth variant="outlined" displayEmpty>
                          <MenuItem value="">Région</MenuItem>
                          {regionList.map((region, index) => (
                            <MenuItem key={index} value={region}>
                              {region}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </Field>
                  </Grid>

                  {/* Alternance */}
                  <Grid item xs={12}>
                    <Field name="alternance" type="checkbox">
                      {({ input }) => (
                        <FormControlLabel control={<Checkbox {...input} />} label="Alternance possible" />
                      )}
                    </Field>
                  </Grid>

                  {/* Distanciel */}
                  <Grid item xs={12}>
                    <Field name="distanciel" type="checkbox">
                      {({ input }) => (
                        <FormControlLabel control={<Checkbox {...input} />} label="Distanciel" />
                      )}
                    </Field>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    mt: 3,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2, // Espacement constant
                    justifyContent: 'center'
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      bgcolor: '#5E3472'
                    }}
                    className='transition-all hover:bg-[#E8DEEC] text-white hover:text-[#5E3472]'
                  >
                    Appliquer filtre
                  </Button>

                  <Button
                    type="reset"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                  >
                    Réinitialiser filtre
                  </Button>
                </Box>

              </Box>
            </Grid>

            {/* Liste des formations */}

          </Grid>
        </form>
      )}
    />
  );
};

export default FilterForm;

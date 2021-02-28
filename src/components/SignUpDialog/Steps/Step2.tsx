import { Grid, Paper, TextField } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

const Step2: any = (props: any) => {
  const classes = useStyles();

  const handleChange = (type: string, event: any) => {
    props.setState(type, event);
  };

  return (
    <Grid container>
      <Grid item xs={12} component={Paper} className={classes.paperComponent} elevation={0} square>
        <div className={classes.paper}>
          <form name="form" className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="gym-name"
              label="Nome da Academia"
              name="gym-name"
              autoComplete="gym-name"
              autoFocus
              defaultValue={props.actualState.gymName}
              onChange={e => handleChange('gymName', e)}
              type="text"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="gym-cnpj"
              label="CNPJ da Academia"
              name="gym-cnpj"
              autoComplete="gym-cnpj"
              defaultValue={props.actualState.gymCnpj}
              onChange={e => handleChange('gymCnpj', e)}
              type="text"
            />
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Step2;

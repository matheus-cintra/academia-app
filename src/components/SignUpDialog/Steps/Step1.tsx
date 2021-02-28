import { Grid, Paper, TextField } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

const Step1: any = (props: any) => {
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
              id="name"
              label="Nome"
              name="name"
              autoComplete="name"
              autoFocus
              type="text"
              defaultValue={props.actualState.name}
              onChange={e => handleChange('name', e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              type="email"
              defaultValue={props.actualState.email}
              onChange={e => handleChange('email', e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              defaultValue={props.actualState.password}
              onChange={e => handleChange('password', e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              label="Confirmação de Senha"
              type="password"
              id="passwordConfirmation"
              autoComplete="password-confirmation"
              defaultValue={props.actualState.passwordConfirmation}
              onChange={e => handleChange('passwordConfirmation', e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Telefone"
              type="text"
              id="phone"
              defaultValue={props.actualState.phone}
              autoComplete="phone"
              onChange={e => handleChange('phone', e)}
            />
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Step1;

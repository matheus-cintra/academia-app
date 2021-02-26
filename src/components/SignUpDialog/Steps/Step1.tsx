import { Grid, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import React from 'react';

// import { Container } from './styles';

const Step1: React.FC = () => {
  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      height: '100vh',
    },
    paper: {
      margin: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    paperComponent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      padding: '15px',
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(1, 0, 1),
    },
    logo: {
      height: '60px',
      marginBottom: '25px',
    },
  }));

  const classes = useStyles();

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
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Step1;

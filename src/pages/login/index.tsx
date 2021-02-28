import { Grid, Paper, Typography, TextField, Button, Link } from '@material-ui/core';
import React, { useState } from 'react';
import { useStyles } from './styles';
import { getMonth } from 'date-fns';
import logo from '../../assets/images/logo.png';
import api from '../../services/api';
import * as Yup from 'yup';
import SignUpDialogComponent from '../../components/SignUpDialog';

const schema = Yup.object().shape({
  email: Yup.string().email('Email inválido'),
  password: Yup.string(),
});

const LoginComponent: React.FC = () => {
  const [form, setForm] = useState({
    email: null,
    password: null,
  });
  const [hasError, setError] = useState({
    email: false,
    password: false,
  });

  const [open, setOpen] = React.useState(false);

  const getSeason = () => {
    const month = getMonth(Date.now());
    if (month > 1 && month < 6) {
      return 'fall';
    } else if (month > 4 && month < 9) {
      return 'winter';
    } else if (month > 7 && month < 11) {
      return 'spring';
    } else {
      return 'summer';
    }
  };

  const season: string = getSeason();

  const classes = useStyles({ season });

  const handleState = (type: string, e: any) => {
    setForm(state => ({ ...state, [type]: e.target.value }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      const validateForm: any = form;
      const formError: any = {
        email: false,
        password: false,
      };

      for (const item in validateForm) {
        if (validateForm[item] === undefined || validateForm[item] === null || validateForm[item] === '') {
          formError[item] = true;
        }
      }
      console.warn('errorrs > ', formError);

      setError({ ...formError });

      await schema.validate(form, {
        abortEarly: true,
      });

      const result = await api.get('/');
      console.warn('result > ', result);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const path: any = error.path;
        setError(state => ({ ...state, [path]: true }));
      }
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={6} md={8} lg={9} className={classes.image} />
      <Grid item xs={12} sm={6} md={4} lg={3} component={Paper} className={classes.paperComponent} elevation={6} square>
        <div className={classes.paper}>
          <img className={classes.logo} src={logo} />
          <Typography component="h1" variant="h5">
            Atlantis Gym
          </Typography>
          <form name="form" className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={hasError.email}
              helperText={hasError.email ? 'Email Inválido' : false}
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => handleState('email', e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              error={hasError.password}
              helperText={hasError.password ? 'Senha Inválida' : false}
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => handleState('password', e)}
            />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  Acessar
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleClickOpen}
                  className={classes.submit}
                >
                  Criar Conta
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueci minha senha
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      <SignUpDialogComponent handleClose={handleClose} open={open} />
    </Grid>
  );
};

export default LoginComponent;

import { Button, Grid, Grow, Link, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useStyles } from './styles';
import { getMonth } from 'date-fns';
import logo from '../../assets/images/logo.png';
import * as yup from 'yup';
import SignUpDialogComponent from '../../components/SignUpDialog';
import { useFormik } from 'formik';
import { useAuth } from '../../contexts/auth';

const LoginComponent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const context = useAuth();

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

  const validationSchema = yup.object().shape({
    email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => handleSubmit(values),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (data: any) => {
    return await context.Login(data);
  };

  return (
    <Grid container component='main' className={classes.root}>
      <Grid item xs={false} sm={6} md={8} lg={9} className={classes.image} />
      <Grid item xs={12} sm={6} md={4} lg={3} component={Paper} className={classes.paperComponent} elevation={6} square>
        <div className={classes.paper}>
          <img className={classes.logo} src={logo} alt='Logo Atlantis' />
          <Typography component='h1' variant='h5'>
            Atlantis Gym
          </Typography>
          <form className={classes.form} id='loginForm' name='loginForm' onSubmit={formik.handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              name='email'
              label='E-mail'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoComplete='email'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Senha'
              type='password'
              id='password'
              autoComplete='current-password'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                  Acessar
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type='button'
                  fullWidth
                  variant='contained'
                  color='secondary'
                  onClick={handleClickOpen}
                  className={classes.submit}
                >
                  Criar Conta
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Esqueci minha senha
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      <Grow in={open} mountOnEnter unmountOnExit timeout={2000} onEnter={(node: any) => console.warn(node)}>
        <SignUpDialogComponent handleClose={handleClose} open={open} />
      </Grow>
    </Grid>
  );
};

export default LoginComponent;

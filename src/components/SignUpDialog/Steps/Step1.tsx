import { Grid, Paper, Slide, TextField } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

const Step1: any = (props: any) => {
  const classes = useStyles();

  return (
    <Slide direction={props.isNext ? 'left' : 'right'} in mountOnEnter unmountOnExit timeout={400}>
      <Grid container>
        <Grid item xs={12} component={Paper} className={classes.paperComponent} elevation={0} square>
          <div className={classes.paper}>
            {/* <form name="form" className={classes.form} noValidate> */}
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='name'
              label='Nome'
              name='step1.name'
              autoComplete='name'
              autoFocus
              type='text'
              value={props.formik.values.step1.name}
              onChange={props.formik.handleChange}
              error={props.formik.touched.name && Boolean(props.formik.errors.name)}
              helperText={props.formik.touched.name && props.formik.errors.name}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              name='step1.email'
              autoComplete='email'
              type='email'
              value={props.formik.values.step1.email}
              onChange={props.formik.handleChange}
              error={props.formik.touched.email && Boolean(props.formik.errors.email)}
              helperText={props.formik.touched.email && props.formik.errors.email}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='step1.password'
              label='Senha'
              type='password'
              id='password'
              autoComplete='current-password'
              value={props.formik.values.step1.password}
              onChange={props.formik.handleChange}
              error={props.formik.touched.password && Boolean(props.formik.errors.password)}
              helperText={props.formik.touched.password && props.formik.errors.password}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='step1.passwordConfirmation'
              label='Confirmação de Senha'
              type='password'
              id='passwordConfirmation'
              autoComplete='password-confirmation'
              value={props.formik.values.step1.passwordConfirmation}
              onChange={props.formik.handleChange}
              error={props.formik.touched.passwordConfirmation && Boolean(props.formik.errors.passwordConfirmation)}
              helperText={props.formik.touched.passwordConfirmation && props.formik.errors.passwordConfirmation}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='step1.phone'
              label='Telefone'
              type='text'
              id='phone'
              autoComplete='phone'
              value={props.formik.values.step1.phone}
              onChange={props.formik.handleChange}
              error={props.formik.touched.phone && Boolean(props.formik.errors.phone)}
              helperText={props.formik.touched.phone && props.formik.errors.phone}
            />
            {/* </form> */}
          </div>
        </Grid>
      </Grid>
    </Slide>
  );
};

export default Step1;

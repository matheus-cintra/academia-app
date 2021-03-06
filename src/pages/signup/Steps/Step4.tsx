import { Divider, Grid, Paper, Slide, TextField, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

const Step4: any = (props: any) => {
  const classes = useStyles();

  return (
    <Slide direction={props.isNext ? 'left' : 'right'} in mountOnEnter unmountOnExit timeout={400}>
      <Grid container>
        <Grid item xs={12} component={Paper} className={classes.paperComponent} elevation={0} square>
          <div className={classes.paper}>
            <Typography component='h2'>Digite o código de verificação que enviamos em seu email.</Typography>
            <Divider className={classes.divider} variant='middle' />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='verificationCode'
              label='Código de Verificação'
              name='verificationCode'
              autoComplete='verificationCode'
              autoFocus
              type='text'
              value={props.formik.values.verificationCode}
              onChange={props.formik.handleChange}
              onBlur={props.formik.handleBlur}
              error={
                props.formik.dirty &&
                props.formik.touched.verificationCode &&
                Boolean(props.formik.errors.verificationCode)
              }
              helperText={
                props.formik.dirty && props.formik.touched.verificationCode && props.formik.errors.verificationCode
              }
            />
          </div>
        </Grid>
      </Grid>
    </Slide>
  );
};

export default Step4;

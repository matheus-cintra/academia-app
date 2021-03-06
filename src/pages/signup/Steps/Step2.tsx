import { Grid, Paper, Slide, TextField } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

const Step2: any = (props: any) => {
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
              id='gymName'
              label='Nome da Academia'
              name='gymName'
              autoComplete='gymName'
              autoFocus
              type='text'
              value={props.formik.values.gymName}
              onChange={props.formik.handleChange}
              onBlur={props.formik.handleBlur}
              error={props.formik.dirty && props.formik.touched.gymName && Boolean(props.formik.errors.gymName)}
              helperText={props.formik.dirty && props.formik.touched.gymName && props.formik.errors.gymName}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='gymCnpj'
              label='CNPJ da Academia'
              name='gymCnpj'
              autoComplete='gymCnpj'
              type='text'
              value={props.formik.values.gymCnpj}
              onChange={props.formik.handleChange}
              onBlur={props.formik.handleBlur}
              error={props.formik.dirty && props.formik.touched.gymCnpj && Boolean(props.formik.errors.gymCnpj)}
              helperText={props.formik.dirty && props.formik.touched.gymCnpj && props.formik.errors.gymCnpj}
            />
            {/* </form> */}
          </div>
        </Grid>
      </Grid>
    </Slide>
  );
};

export default Step2;

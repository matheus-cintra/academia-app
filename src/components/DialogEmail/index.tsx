import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle, Grid, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { useStylesCreateEditPage } from './styles';
import { useEffect } from 'react';

const FormDialogEmail: any = (props: any) => {
  const classes = useStylesCreateEditPage();

  useEffect(() => {
    formik.setFieldValue('name', props.user.name);
    formik.setFieldValue('email', props.user.email);
  }, [props]);

  const handleSubmit = async (data: string) => {
    console.warn('data > ', data);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      emailContent:
        'Não identificamos o pagamento de sua mensalidade. \n\nPor favor, regularize para continuar usufruindo de nossas instalações.',
    },
    onSubmit: (values: any) => handleSubmit(values),
  });

  return (
    <div>
      <Dialog
        className={classes.dialog}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Notificar Atraso</DialogTitle>
        <form className={classes.form} id='sendEmail' name='sendEmail' onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                autoFocus
                margin='normal'
                id='name'
                name='name'
                label='Nome do Aluno'
                type='text'
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                margin='normal'
                id='email'
                name='email'
                label='Email do Aluno'
                type='email'
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                margin='normal'
                id='emailContent'
                name='emailContent'
                label='Mensagem para o aluno...'
                type='text'
                fullWidth
                multiline
                rows={4}
                value={formik.values.emailContent}
                onChange={formik.handleChange}
                error={formik.touched.emailContent && Boolean(formik.errors.emailContent)}
                helperText={formik.touched.emailContent && formik.errors.emailContent}
              />
            </Grid>
            <Grid item>
              <DialogActions>
                <Button onClick={props.handleClose} color='primary'>
                  Cancel
                </Button>
                <Button type='submit' color='primary'>
                  Subscribe
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </div>
  );
};

export default FormDialogEmail;

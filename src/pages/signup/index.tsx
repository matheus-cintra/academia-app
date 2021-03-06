import { Button, CircularProgress, Dialog, Grid, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import useStyles from './styles';
import { useFormik } from 'formik';
import Step4 from './Steps/Step4';
import * as yup from 'yup';
import Step5 from './Steps/Step5';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

const SignUpDialogComponent: any = (props: any) => {
  const [isNext, setIsNext] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const classes = useStyles();

  const getSteps = () => {
    return ['Dados Básicos', 'Dados da Academia', 'Tipo de Assinatura', 'Confirmação', 'Sucesso'];
  };

  const steps = getSteps();

  const validationSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email Inválido').required('Email é obrigatório'),
    password: yup.string().required('Senha é obrigatório'),
    passwordConfirmation: yup
      .string()
      .required('Confirmação de senha é obrigatório')
      .oneOf([yup.ref('password'), null], 'Senhas não batem'),
    phone: yup.string().required('Telefone de contato é obrigatório'),
    gymName: yup.string().required('Nome da academia é obrigatório'),
    gymCnpj: yup.string().required('CNPJ da academia é obrigatório'),
    subscription: yup.string().required('Tipo de assinatura é obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      phone: '',
      gymName: '',
      gymCnpj: '',
      subscription: '',
      verificationCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => handleSubmit(values),
  });

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <Step1 isNext={isNext} formik={formik} />;

      case 1:
        return <Step2 isNext={isNext} formik={formik} />;

      case 2:
        return <Step3 isNext={isNext} formik={formik} />;

      case 3:
        return <Step4 isNext={isNext} formik={formik} isSaving={isLoading} />;

      case 4:
        return <Step5 isNext={isNext} />;
    }
  };

  const handleNext = () => {
    console.warn('handleNext', isLoading);
    if (activeStep === steps.length - 1) return handleClose();
    setIsNext(true);
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setIsNext(false);
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClose = () => {
    props.handleClose();
    formik.resetForm();
    setActiveStep(0);
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await api.post('/accounts/create', { ...data });
      setIsLoading(false);
      setIsCreated(true);
      handleNext();
    } catch (e) {
      setIsLoading(false);
      toast.error(e.response.data.message[0]);
    }
  };

  const handleActivate = async (values: any) => {
    setIsLoading(true);
    try {
      const { email, verificationCode } = values;
      await api.get(`/accounts/activate/${verificationCode}/${email}`);
      setIsLoading(false);
      handleNext();
    } catch (e) {
      setIsLoading(false);
      toast.error(e.response.data.message[0]);
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        maxWidth={activeStep === 0 ? 'sm' : 'lg'}
        aria-labelledby='form-dialog-title'
      >
        <div className={classes.root}>
          <form id='registerForm' name='registerForm'>
            <Stepper className={classes.overviewContainer} activeStep={activeStep} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div className={classes.overviewContainer}>
                  <Typography className={classes.instructions}>All steps completed</Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (
                <div>
                  {isLoading ? (
                    <Grid item xs={12} component={Paper} className={classes.loaderComponent} elevation={0} square>
                      <CircularProgress />
                    </Grid>
                  ) : (
                    <>
                      <div>{getStepContent(activeStep)}</div>
                      <div className={classes.actionsContainer}>
                        <Button
                          type='button'
                          disabled={activeStep === 0 || isCreated}
                          onClick={handleBack}
                          className={classes.backButton}
                        >
                          Voltar
                        </Button>
                        {activeStep === 2 ? (
                          <Button
                            variant='contained'
                            disabled={!formik.isValid}
                            color='primary'
                            type='button'
                            onClick={() => formik.handleSubmit()}
                          >
                            Registrar
                          </Button>
                        ) : activeStep === 3 ? (
                          <Button
                            variant='contained'
                            color='primary'
                            type='button'
                            onClick={() => handleActivate(formik.values)}
                          >
                            Ativar Conta
                          </Button>
                        ) : (
                          <Button type='button' variant='contained' color='primary' onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Fechar' : 'Avançar'}
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default SignUpDialogComponent;

import { Button, Dialog, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import useStyles from './styles';
import { useFormik } from 'formik';

const SignUpDialogComponent: any = (props: any) => {
  const [form, setForm] = useState({});
  const [isNext, setIsNext] = useState(true);

  const handleState = (type: string, e: any) => {
    setForm(state => ({ ...state, [type]: e.target.value }));
  };

  const clearState = () => {
    setForm({});
  };

  const getSteps = () => {
    return ['Dados Básicos', 'Dados da Academia', 'Tipo de Assinatura'];
  };

  const formik = useFormik({
    initialValues: {
      step1: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        phone: '',
      },
      step2: {
        gymName: '',
        gymCnpj: '',
      },
      step3: {
        subscription: '',
      },
    },
    // validationSchema: validationSchema,
    onSubmit: values => handleSubmit(values),
  });

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <Step1 isNext={isNext} formik={formik} setState={handleState} clearState={clearState} />;

      case 1:
        return <Step2 isNext={isNext} formik={formik} setState={handleState} clearState={clearState} />;

      case 2:
        return <Step3 isNext={isNext} formik={formik} setState={handleState} clearState={clearState} />;
    }
  };

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
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
    clearState();
    setActiveStep(0);
  };

  const handleSubmit = async (data: any) => {
    console.warn('data > submit > ', data);
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
          <form id='registerForm' name='registerForm' onSubmit={formik.handleSubmit}>
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
                  <div>{getStepContent(activeStep)}</div>
                  <div className={classes.actionsContainer}>
                    <Button
                      type='button'
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Voltar
                    </Button>
                    {activeStep === 2 ? (
                      <Button variant='contained' color='primary' type='submit'>
                        Registrar
                      </Button>
                    ) : (
                      <Button type='button' variant='contained' color='primary' onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Fechar' : 'Avançar'}
                      </Button>
                    )}
                  </div>
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

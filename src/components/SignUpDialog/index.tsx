import { Dialog, Button, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import useStyles from './styles';

const SignUpDialogComponent: any = (props: any) => {
  const [form, setForm] = useState({});

  const handleState = (type: string, e: any) => {
    setForm(state => ({ ...state, [type]: e.target.value }));
  };

  const clearState = () => {
    setForm({});
  };

  const getSteps = () => {
    return ['Dados Básicos', 'Dados da Academia', 'Tipo de Assinatura'];
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <Step1 actualState={form} setState={handleState} clearState={clearState} />;
      case 1:
        return <Step2 actualState={form} setState={handleState} clearState={clearState} />;
      case 2:
        return <Step3 actualState={form} setState={handleState} clearState={clearState} />;
      default:
        return 'Unknown stepIndex';
    }
  };

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    console.warn('form > ', form);

    if (activeStep === steps.length - 1) return handleClose();
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
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

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      maxWidth={activeStep === 0 ? 'sm' : 'lg'}
      aria-labelledby="form-dialog-title"
    >
      <div className={classes.root}>
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
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>
                  Voltar
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Fechar' : 'Avançar'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default SignUpDialogComponent;

import { Grid, Paper, Slide, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

const Step5: any = (props: any) => {
  const classes = useStyles();

  return (
    <Slide direction={props.isNext ? 'left' : 'right'} in mountOnEnter unmountOnExit timeout={400}>
      <Grid container>
        <Grid item xs={12} component={Paper} className={classes.paperComponent} elevation={0} square>
          <div className={classes.paper}>
            <Typography component='h2'>
              Conta ativada. Seja bem-vindo a Atlantis Gym. Você já pode fazer login com sua nova conta!
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Slide>
  );
};

export default Step5;

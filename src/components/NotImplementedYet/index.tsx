import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { useStyles } from './styles';
import image from '../../assets/images/under-development.jpeg';

const NotImplementedYet: any = (props: any) => {
  const classes = useStyles();
  const { pageName } = props;

  return (
    <Paper className={classes.root}>
      <img src={image} alt='Under Construction Image' className={classes.image} />
      <Typography variant='h2' className={classes.text}>
        Página &quot;{pageName}&quot; em Desenvolvimento.
      </Typography>
    </Paper>
  );
};

export default NotImplementedYet;

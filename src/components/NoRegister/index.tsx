import React from 'react';
import Paper from '@material-ui/core/Paper';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { Typography } from '@material-ui/core';
import { useStyles } from './styles';

const NoRegisterComponent: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <InsertDriveFileIcon className={classes.icon} />
      <Typography variant='h2' className={classes.text}>
        Nenhum Registro
      </Typography>
    </Paper>
  );
};

export default NoRegisterComponent;

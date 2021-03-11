import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      color: '#E0C3C3',
      padding: '12px',
    },
    icon: {
      width: '2em',
      height: '2em',
      color: '#E0C3C3',
    },
  })
);
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

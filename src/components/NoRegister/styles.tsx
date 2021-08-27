import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    height: '300px',
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
}));

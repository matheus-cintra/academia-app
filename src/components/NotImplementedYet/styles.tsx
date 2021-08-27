import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
    fontWeight: 100,
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    padding: '12px',
    letterSpacing: 4,
  },
  image: {
    width: 600,
  },
}));

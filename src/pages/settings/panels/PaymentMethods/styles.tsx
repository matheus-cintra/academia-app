import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '210px',
    display: 'flex',
    minWidth: 330,
    maxWidth: 330,
    marginTop: 24,
    marginLeft: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    },
    cursor: 'pointer',
  },
  card: {
    height: '210px',
    margin: '15px 0',
  },
  rootNew: {
    display: 'flex',
    marginTop: 24,
    marginLeft: 12,
    height: '210px',
    minWidth: 330,
    maxWidth: 330,
    flexDirection: 'column',
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
  form: {
    padding: theme.spacing(1),
  },
  paper: {
    height: 210,
    padding: 16,
    textAlign: 'center',
    marginBottom: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  paperNew: {
    height: 210,
    padding: 16,
    textAlign: 'center',
    marginBottom: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    },
  },
  titleName: {
    width: 'calc(100% + 32px)',
    backgroundColor: theme.palette.info.dark,
    '& > h2': {
      color: '#fff',
      padding: 4,
    },
  },
  submitButton: {
    padding: 12,
  },
}));

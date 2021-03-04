import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
  },
  cardRoot: {
    minWidth: '250px',
    maxWidth: '250px',
    margin: 16,
    flexBasis: '100%',
    borderRadius: '0.7rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    '&:hover': {
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    },
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  paper: {
    width: '100%',
    margin: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paperComponent: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    padding: '15px',
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
  logo: {
    height: '60px',
    marginBottom: '25px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    padding: 12,
  },
  pos: {
    margin: '24px 0 6px',
    textAlign: 'center',
  },
  priceContainer: {
    backgroundColor: '#545585',
    padding: 15,
  },
  cardContent: {
    padding: 0,
  },
  price: {
    color: '#fff',
    fontSize: '2.4rem',
    textAlign: 'center',
  },
  selectButtonContainer: {
    padding: 0,
    justifyContent: 'center',
    background: '#545585',
  },
  selectButton: {
    display: 'block',
    width: '100%',
    padding: 14,
    color: '#fff',
  },
  blockedItem: {
    textDecoration: 'line-through',
    color: '#bbb',
  },
}));

export default useStyles;

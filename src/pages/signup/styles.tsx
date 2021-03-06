import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    overflowX: 'hidden',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(3),
  },
  overviewContainer: {
    marginTop: theme.spacing(3),
  },
  loaderComponent: {
    display: 'flex',
    minHeight: '350px',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

export default useStyles;

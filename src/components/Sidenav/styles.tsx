import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default useStyles;

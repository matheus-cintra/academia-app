import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      minWidth: 360,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    accountInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 64px',
    },
    menuList: {
      '& > div > ul': {
        padding: 0,
      },
      '& > div:nth-child(2)': {
        top: '50px!important',
      },
      '& > div:nth-child(3)': {
        top: '50px!important',
      },
    },
    listIcon: {
      minWidth: 32,
    },
  })
);

export default useStyles;

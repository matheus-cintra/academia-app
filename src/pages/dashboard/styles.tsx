import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    rootContainer: {
      height: 'calc(100vh - 64px)',
      padding: theme.spacing(4),
      '& .hideHeaderClass': {
        [theme.breakpoints.down('xs')]: {
          display: 'none',
        },
      },
      '& .hideCellClass': {
        [theme.breakpoints.down('xs')]: {
          display: 'none',
        },
      },
      '& .headerClass': {
        [theme.breakpoints.down('sm')]: {
          minWidth: '100px!important',
          maxWidth: '100px!important',
        },
      },
      '& .cellClass': {
        [theme.breakpoints.down('sm')]: {
          minWidth: '100px!important',
          maxWidth: '100px!important',
        },
      },
      '& .MuiDataGrid-colCellTitle': {
        fontWeight: 600,
      },
      '& .MuiDataGrid-window': {
        overflowX: 'hidden',
      },
    },
    root: {
      display: 'flex',
      minWidth: 275,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 24,
      fontWeight: 600,
    },
    pos: {
      marginBottom: 12,
    },
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '32px 0',

      [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'space-between',
        flexDirection: 'row',
      },
    },
    cardContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    typographyContent: {
      padding: 24,
    },
    typographySubtitle: {
      color: '#A6ACBE',
    },
    titleComponent: {
      padding: '16px 0',
    },
    membersList: {
      flexDirection: 'column',
    },
    paper: {
      margin: theme.spacing(4),
      border: '1px solid #fafafa',
    },
  };
});

export default useStyles;

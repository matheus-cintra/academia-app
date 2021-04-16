import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStylesCreateEditPage = makeStyles((theme: Theme) =>
  createStyles({
    rootContainer: {
      height: 'calc(100vh - 64px)',
      padding: theme.spacing(4),
      '& .MuiSelect-select:focus': {
        backgroundColor: '#FFF!important',
      },
    },
    titleComponent: {
      padding: '16px 0',
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    titleContent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 600,
    },
    titleInsideForm: {
      fontSize: 16,
      fontWeight: 600,
      color: '#A99E9E',
      marginBottom: 12,
      marginTop: 12,
    },
    typographySubtitle: {
      color: '#A6ACBE',
      marginBottom: 12,
      marginLeft: '56px',
      marginTop: -12,
    },
    form: {
      padding: theme.spacing(4),
    },
    row: {
      display: 'flex',
      justifyContent: 'center',
    },
    mLeft: {
      marginLeft: 5,
    },
    mRight: {
      marginRight: 5,
    },
    divider: {
      margin: '24px 0',
    },
    paperLoading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px',
    },
    formControl: {
      width: '100%',
    },
    titleRoot: {},
  })
);

export const useStylesListPage = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: 0,
      borderRadius: 4,
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    },
    rootContainer: {
      height: 'calc(100vh - 64px)',
      padding: theme.spacing(4),
    },
    titleComponent: {
      padding: '16px 0',
    },
    headerComponent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    actionsComponent: {
      padding: theme.spacing(0, 3),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 600,
    },
    typographySubtitle: {
      color: '#A6ACBE',
    },
    listItemBlock: {},
    paginator: {
      justifyContent: 'center',
      padding: '16px!important',
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    listItemPerson: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
    },
    menuActions: {
      boxShadow: '0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%) !important',
    },
    loading: {
      height: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
  })
);

import { makeStyles, Theme } from '@material-ui/core';

export const useStylesCreateEditPage = makeStyles((theme: Theme) => ({
  dialog: {
    '> div': {
      height: 450,
    },
  },
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
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
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
  richText: {
    height: 225,
  },
}));

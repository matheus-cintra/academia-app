import { makeStyles, Theme } from '@material-ui/core';

export const useStylesSettingsPage = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    minWidth: 300,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
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
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
  typographySubtitle: {
    color: '#A6ACBE',
  },
  actionsComponent: {
    padding: theme.spacing(0, 3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootNew: {
    display: 'flex',
    height: '400px',
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
  accordionSummary: {
    transition: 'background 0.2s ease-in',
    '&:hover': {
      background: '#777',
    },
  },
}));

export const useStylesAccordion1 = makeStyles((theme: Theme) => ({
  form1: {
    paddingLeft: theme.spacing(4),
  },
}));

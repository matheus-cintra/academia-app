import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      light: '#B5DF34',
      main: '#322169',
      dark: '#87A629',
      contrastText: '#F2F2F2',
    },
    secondary: {
      main: '#444444',
    },
    success: {
      main: '#219653',
    },
    error: {
      main: '#cf3232',
    },
    warning: {
      main: '#F2C94C',
    },
  },
});

export default theme;

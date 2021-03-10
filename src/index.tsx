import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'fontsource-roboto';
import { CssBaseline } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'react-perfect-scrollbar/dist/css/styles.css';

ReactDOM.render(
  // <React.StrictMode>
  <Fragment>
    {/*<ThemeProvider theme={theme}>*/}
    <CssBaseline />
    <App />
    <ToastContainer autoClose={3000} />
    {/*</ThemeProvider>*/}
  </Fragment>,
  // </React.StrictMode>,
  document.getElementById('root')
);

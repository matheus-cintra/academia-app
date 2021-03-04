import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'fontsource-roboto';
import { CssBaseline } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  // <React.StrictMode>
  <>
    <CssBaseline />
    <App />
    <ToastContainer autoClose={3000} />
  </>,
  // </React.StrictMode>,
  document.getElementById('root')
);

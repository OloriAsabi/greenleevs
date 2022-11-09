import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ContextProvider } from './contexts/ContextProvider';
import { ForgotPassword, Login, Register, WelcomePage } from './pages';

/* eslint-disable */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <SnackbarProvider
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
    <ContextProvider>
    <Routes>
    <Route path="/*" element={<App />} /> 
    <Route path="/welcome" element={(<WelcomePage />)} />
    <Route path="/login" element={(<Login />)} />
    <Route path="/register" element={(<Register />)} />
    <Route path="/forgotPassword" element={(<ForgotPassword />)} />
    </Routes>
    </ContextProvider>
  </SnackbarProvider>
  </BrowserRouter>
</React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
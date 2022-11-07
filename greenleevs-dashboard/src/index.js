import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ForgotPassword, Login, Register } from './pages';
import { SnackbarProvider } from 'notistack';


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
        <Route path="/login" element={(<Login />)} />
        <Route path="/register" element={(<Register />)} />
        <Route path="/forgotPassword" element={(<ForgotPassword />)} />
     </Routes>
    </ContextProvider>
    </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);

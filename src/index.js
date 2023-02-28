import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Provider } from 'react-redux';
import { store } from './rootReducer';
import { ForgotPassword, Login, Register, WelcomePage } from './pages';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <ToastContainer
    position='top-center'
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    theme= "colored"
    />
    <Routes>
    <Route path="/*" element={<App />} /> 
    <Route path="/welcome" element={(<WelcomePage />)} />
    <Route path="/login" element={(<Login />)} />
    <Route path="/register" element={(<Register />)} />
    <Route path="/forgotPassword" element={(<ForgotPassword />)} />
    </Routes>
    </Provider>
  </BrowserRouter>
</React.StrictMode>
);
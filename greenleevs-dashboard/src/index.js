import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ForgotPassword, Login, Register, ResetPassword } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Provider } from 'react-redux';
import { store } from './rootReducer';

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
        <Route path="/login" element={(<Login />)} />
        <Route path="/register" element={(<Register />)} />
        <Route path="/forgotPassword" element={(<ForgotPassword />)} />
        <Route path="/resetPassword" element={(<ResetPassword />)} />
     </Routes>  
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

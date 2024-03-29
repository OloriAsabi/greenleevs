import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { 
  Brands, 
  Categories, 
  CategoryDetails, 
  Customers, 
  Home, 
  Orders, 
  Products, 
  Settings, 
  OrdersDetails, 
  BrandsDetails, 
  PageNotFound  } from "./pages";
import { Routes, Route, redirect, Navigate } from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import Productdetails from './pages/ProductDetails';
import { useSelector } from 'react-redux';
import { selectToken } from './reducers/auth';

function App() {
  const [userInfo, setUserInfo] = useState();
  const { users, activeMenu } = useSelector(state => state.auth);
  const scrollRef = useRef(null);
  const token = useSelector(selectToken);
  const storedToken = localStorage.getItem('token');

  useEffect(() => {
     setUserInfo(users)
  }, [users]);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  });

  return (
    <div>
    <div className="flex relative dark:bg-main-dark-bg">
      {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar  userInfo={userInfo} />
          </div>
          <div ref={scrollRef}>
            <Routes>
              <Route path='/' element={( (storedToken || token) ? <Home/> : <Navigate to='/login'/> )}/>
              <Route path='/home' element={( (storedToken || token) ? <Home/> : <Navigate to='/login'/> )}/>
              <Route path="/products" element={(<Products />)} />
              <Route path="/products/:id" element={(<Productdetails />)} />
              <Route path="/categories" element={(<Categories />)} />
              <Route path="/categories/:id" element={(<CategoryDetails />)} />
              <Route path="/customers" element={(<Customers />)} />
              <Route path="/orders" element={(<Orders />)} />
              <Route path="/orders/:id" element={(<OrdersDetails />)} />
              <Route path='/brands' element={(<Brands />)} />
              <Route path='/brands/:id' element={(<BrandsDetails />)} />
              <Route path="/settings" element={(<Settings  />)} />
              <Route path="/404" element={<PageNotFound />} />
          	  <Route path="*" element={redirect("/404")} />

            </Routes>
          </div>
        </div>
    </div>
  </div>
  );
}

export default App;

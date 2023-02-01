import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Brands, Categories, Coupons,CategoryDetails, Customers, Home, Orders, Products, Settings, OrdersDetails, BrandsDetails  } from "./pages";
import { Routes, Route, useNavigate  } from 'react-router-dom';

import { useStateContext } from './contexts/ContextProvider';
import { Sidebar, Navbar } from './components';
import Productdetails from './pages/ProductDetails';
// import ErrorPage from './pages/404';

function App() {
  const [userInfo, setUserInfo] = useState();
  const { activeMenu, state} = useStateContext();
  const { user } = state;
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const getUser = useCallback(
    () => {
      if(!user) {
        navigate("/login")
      }else{
       setUserInfo(user)
      }
    },[navigate, user]);
  

  useEffect(() => {
   getUser()
  }, [getUser]);


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
              <Route exact path="/" element={(<Home />)} />
              <Route path="/home" element={(<Home/>)} />

              <Route path="/products" element={(<Products />)} />
              <Route path="/products/:id" element={(<Productdetails />)} />
              <Route path="/categories" element={(<Categories />)} />
              <Route path="/categories/:id" element={(<CategoryDetails />)} />
              <Route path="/customers" element={(<Customers />)} />
              <Route path="/orders" element={(<Orders />)} />
              <Route path="/orders/:id" element={(<OrdersDetails />)} />
              <Route path='/brands' element={(<Brands />)} />
              <Route path='/brands/:id' element={(<BrandsDetails />)} />
              {/* <Route path="/coupons" element={(<Coupons />)} /> */}
              <Route path="/settings" element={(<Settings  />)} />
            </Routes>
          </div>
        </div>
    </div>
  </div>
  );
}

export default App;

import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Categories, Coupons, Customers, Home, Orders, Products, Settings  } from "./pages";
import { Routes, Route, useNavigate  } from 'react-router-dom';

import { useStateContext } from './contexts/ContextProvider';
import { Sidebar, Navbar } from './components';
import { GetProducts } from './apis/api'


function App() {
  const [userInfo, setUserInfo] = useState();
  const { activeMenu, state} = useStateContext();
  const { user } = state;
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [products, setProducts] = useState();

  useEffect(() => {
    if(!user) {
      navigate("/login")
    }else{
     setUserInfo(user)
    }
    GetProducts()
      .then((data) => {
      setProducts(data);
      // localStorage.clear();
   })
  }, [navigate, user]);

  console.log(products);

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
              <Route path="/categories" element={(<Categories />)} />
              <Route path="/customers" element={(<Customers />)} />
              <Route path="/orders" element={(<Orders />)} />
              <Route path="/coupons" element={(<Coupons />)} />
              <Route path="/settings" element={(<Settings  />)} />
            </Routes>
          </div>
        </div>
    </div>
  </div>
  );
}

export default App;

import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate} from 'react-router-dom';
import { BillingDetails, Footer, Navbar, PaymentDetails } from './components';
import { Carts, Categories, CheckOut, ComingSoon, Error, Home, Orders, ProductDetails, Settings, Shipping, Shop, SpecialMenu, UserProfile } from './pages';


import { GetCategories } from './apis/api';
import ScrollToTop from "react-scroll-to-top";
import { useSelector } from 'react-redux';


function App() {

  const scrollRef = useRef(null);
  const {  welcomeInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if(!welcomeInfo) {
      navigate("/welcome")
    }
    scrollRef.current.scrollTo(0, 0)
  }, [navigate, welcomeInfo]);

  useEffect(() => {
    GetCategories()
    .then((response) => {
    const data = response.data.data
      
    setCategories(data)
    }).catch((e) => {
    console.log(e);
    });
  },[]);

  return (
    <div className="flex flex-col justify-between h-screen">
           <ScrollToTop smooth color='#1F451A' className='p-1' />
           <header>
          <Navbar/>
          </header>
          <main ref={scrollRef}>
            <Routes>
              <Route exact path="/" element={(<Home />)} />
              <Route exact path="/shop" element={(<Shop/>)} />
              <Route path='/shop/:id' element={(<Categories/>)} />
              <Route path='user' element={(<UserProfile />)} >
              <Route path='orders' element={(<Orders />)} />
              <Route path='shipping' element={(<Shipping />)} />
              <Route path='settings' element={(<Settings />)} />
              </Route>

              <Route path='/carts' element={(<Carts />)} />
              <Route path='/special' element={(<SpecialMenu/>)} />
              <Route path="/product/:id" element={<ProductDetails/>} />
              <Route path="/checkout" element={<CheckOut/>} />
              <Route path="/404" element={<Error/>} />
              <Route path="/comingsoon" element={<ComingSoon/>} />

              <Route path="/billing" element={<BillingDetails/>} />
              <Route path="/payment" element={<PaymentDetails/>} />
            </Routes>
          </main>
          <Footer/>
    </div>
  );
}

export default App;

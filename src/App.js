import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate  } from 'react-router-dom';
import { BillingDetails, Footer, Navbar, PaymentDetails } from './components';
import { Accessories, Carts, CheckOut, Home, Orders, ProductDetails, Settings, Shipping, Shop, SpecialMenu, UserProfile } from './pages';

import { useStateContext } from './contexts/ContextProvider';

function App() {
  const scrollRef = useRef(null);
  const { state } = useStateContext();
  const { welcome } = state;
  const [welcomeInfo, setWelcomeInfo] = useState();

  const navigate = useNavigate();

  // useEffect(() => {
  //   if(!welcome) {
  //     navigate("/welcome")
  //   }else{
  //     setWelcomeInfo(welcome)
  //   }
  //   scrollRef.current.scrollTo(0, 0)
  // }, [navigate, welcome]);

  return (
    <div className="flex flex-col justify-between h-screen">
           <header>
          <Navbar/>
          </header>
          <main ref={scrollRef}>
            <Routes>
              <Route exact path="/" element={(<Home />)} />
              <Route exact path="/home" element={(<Home />)} />
              <Route exact path="/shop" element={(<Shop/>)} />
              <Route path='/user' element={(<UserProfile />)} >
              <Route path=':orders' element={(<Orders />)} />
              <Route path=':shipping' element={(<Shipping />)} />
              <Route path=':settings' element={(<Settings />)} />
              </Route>

              <Route path='/carts' element={(<Carts />)} />
              <Route path='/shop/accessories' element={(<Accessories />)} />
              <Route path='/specialmenu' element={(<SpecialMenu/>)} />
              <Route path="/product/:id" element={<ProductDetails/>} />
              <Route path="/checkout" element={<CheckOut/>} />

              <Route path="/billing" element={<BillingDetails/>} />
              <Route path="/payment" element={<PaymentDetails/>} />
            </Routes>
          </main>
          <Footer/>
    </div>
  );
}

export default App;

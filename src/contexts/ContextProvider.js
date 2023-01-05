/* eslint-disable */
import React, { createContext, useContext, useReducer } from 'react';

const StateContext = createContext();

const initialState = {
  welcome: localStorage.getItem('welcome')
    ? JSON.parse(localStorage.getItem('welcome'))
    : null,
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
    cart: {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
        paymentMethod: localStorage.getItem('paymentMethod')
        ? localStorage.getItem('paymentMethod')
        : '',
    },
};

function reducer (state, action) {
  console.log(action.payload);
  switch (action.type) {
  case 'WELCOME_INFO':
    return { ...state, welcome: action.payload };
  default:
    return state;
  case 'WELCOME_NO_INFO':
    return {
      ...state,
      welcome: null,
    };
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._key === newItem._key
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._key === existItem._key ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    };
  case 'CART_REMOVE_ITEM': {
    const cartItems = state.cart.cartItems.filter(
      (item) => item._key !== action.payload._key
    );
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };
  case 'USER_LOGIN':
    return { 
      ...state, user: 
          action.payload 
    };
    case 'USER_UPDATE':
    return { 
      ...state, user: 
          action.payload 
    };
  case 'USER_LOGOUT':
    return {
      ...state,
      user: null,
      cart: {
        cartItems: [],
        shippingAddress: {},
      },
    };  
    case 'SAVE_SHIPPING_ADDRESS':
              return {
                ...state,
                cart: {
                  ...state.cart,
                  shippingAddress: action.payload,
                },
              };
              case 'SAVE_PAYMENT_METHOD':
                return {
                  ...state,
                  cart: {
                    ...state.cart,
                    paymentMethod: action.payload,
                  },
    };      
  }
}

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  
  return (  
    <StateContext.Provider 
      value={{
        state,
        dispatch
      }}>
      {children}
    </StateContext.Provider>
  );
};
  
export const useStateContext = () => useContext(StateContext);
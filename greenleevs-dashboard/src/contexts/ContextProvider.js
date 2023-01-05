import React, { createContext, useContext, useState, useReducer } from 'react';

const StateContext = createContext();

const initialState = {
  authenticated: false,
  user: localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null,
  products: [],
  customers: [],
  categories: [],
  brands: [],
  notification: false,
};

function reducer(state, action) {
  console.log(action.payload);
  switch (action.type) {
    case 'USER_LOGIN':
        return { ...state, user: action.payload };
        default:
         return state;
    case 'USER_RESET_PASSWORD':
      return { ...state, user: action.payload };
    case 'USER_UPDATE':
        return { 
          ...state, user: 
              action.payload 
        };
    case 'USER_LOGOUT':
      return {
          ...state,
          user: null,
        };
    case "ADD_PRODUCTS":
      return {
        ...state, products:
        action.payload
      } ;
      case "ADD_CUSTOMERS":
      return {
        ...state, customers:
        action.payload
      }       
      case "ADD_CATEGORIES":
      return {
        ...state, categories:
        action.payload
      } 
      case "ADD_BRANDS":
        return {
          ...state, brands:
          action.payload
        }       
      }
  };
export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    
    <StateContext.Provider 
    value={{
    activeMenu,
    state,
    dispatch,
    screenSize, 
    handleClick, 
    isClicked,  
    initialState, 
    setIsClicked, 
    setScreenSize, 
    setActiveMenu,}}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
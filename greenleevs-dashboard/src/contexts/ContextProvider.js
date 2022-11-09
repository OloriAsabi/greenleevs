import React, { createContext, useContext, useState, useReducer } from 'react';

const StateContext = createContext();

const initialState = {
  userProfile: false,
  authenticated: false,
  user: localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null,
  notification: false,
};

function reducer(state, action) {
  console.log(action.payload);
  switch (action.type) {
    case 'USER_LOGIN':
        return { ...state, user: action.payload };
        default:
         return state;
    case 'USER_LOGOUT':
      return {
          ...state,
          user: null,
        };    
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
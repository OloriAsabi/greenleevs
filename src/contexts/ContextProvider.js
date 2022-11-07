import React, { createContext, useContext,  useReducer } from 'react';

const StateContext = createContext();

const initialState = {
  welcome: localStorage.getItem('welcome')
  ? JSON.parse(localStorage.getItem('welcome'))
  : null,
  user: localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null,
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
   case 'USER_LOGIN':
        return { 
          ...state, user: 
          action.payload 
        };
    case 'USER_LOGOUT':
      return {
          ...state,
          user: null,
        };        
        }
    };

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
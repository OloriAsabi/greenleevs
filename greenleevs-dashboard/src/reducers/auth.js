import { createSlice } from "@reduxjs/toolkit";
import { LoginUser, RegisterUser } from "../apis/api";

const users = localStorage.getItem('user')
? JSON.parse(localStorage.getItem('user'))
: null

const initialState = {
	isAuthenticated: false,
	loading: false,
  activeMenu: true,
    users,
    error: null,
    isClicked: {},
    screenSize: undefined,
    products: [],
    brands: [],
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload;
      },
      startLoading: state => {
          state.loading = true;
       },
       setActiveMenu: (state, action) => {
        state.activeMenu = action.payload;
      },
      setScreenSize: (state, action) => {
        state.screenSize = action.payload;
      },  
      setUserLogin: (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.isAuthenticated = true; 
      },
      setProducts: (state, action) => {
        state.products = action.payload
      },
      setBrands: (state, action) => {
        state.brands = action.payload
      },
    logout: (state) => {
        localStorage.removeItem('token') // delete token from storage
        localStorage.removeItem('user')
        state.loading = false
        state.users = null
        state.token = null
        state.error = null
      },
      setCredentials: (state, { payload }) => {
        state.user = payload
      },   
      setIsClicked: (state, action) => {
        state.isClicked = { ...state.isClicked, [action.payload]: true };
      },
      setUserReset: (state, action) => {
        state.users = action.payload
      },
      setUserUpdate: (state, action) => {
        state.users = action.payload
      }
    },
    extraReducers: {
        //Login
        [LoginUser.pending]: (state) => {
            state.loading = true
            state.error = null
          },
          [LoginUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = payload
            state.token = payload.userToken
          },
          [LoginUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
          },
          //register
          [RegisterUser.pending]: (state) => {
            state.loading = true
            state.error = null
          },
          [RegisterUser.fulfilled]: 
          (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
          },
         [RegisterUser.rejected]: 
         (state, { payload }) => {
            state.loading = false
            state.error = payload
          },
    }
  });

  export const selectToken = state => state.auth.token;
  export const selectUser = state => state.auth.users;

  export const { 
    setToken,
    logout,
    setCredentials,
    setUserLogin,
    startLoading,
    setActiveMenu,
    setScreenSize,
    setIsClicked,
    setBrands,
    setProducts, 
    setUserReset, setUserUpdate } = authSlice.actions

  export default authSlice.reducer;
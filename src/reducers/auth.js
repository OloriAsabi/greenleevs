import { createSlice } from "@reduxjs/toolkit";
import { LoginUser, RegisterUser } from "../apis/api";

const users = localStorage.getItem('user')
? JSON.parse(localStorage.getItem('user'))
: null

const cart = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
    shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
    paymentMethod: localStorage.getItem('paymentMethod')
    ? localStorage.getItem('paymentMethod')
    : '',
}
const initialState = {
	isAuthenticated: false,
	loading: false,
  activeMenu: true,
    users,
    cart,
    error: null,
    isClicked: {},
    welcomeInfo: {},
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
      updateUser: (state, action) => {
        state.user = action.payload;
      },
      setProducts: (state, action) => {
        state.products = action.payload
      },
      setBrands: (state, action) => {
        state.brands = action.payload
      },
      setWelcomeInfo: (state, action) => {
        state.welcomeInfo = action.payload
      },
      setWelcomeNoInfo: (state) => {
        state.welcome = null;
      },
      addCartItem: (state, action) => {
        const newItem = action.payload;
        const existItem = state.cart.cartItems.find((item) => item._key === newItem._key);
        const cartItems = existItem
          ? state.cart.cartItems.map((item) => (item._key === existItem._key ? newItem : item))
          : [...state.cart.cartItems, newItem];
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        state.cart.cartItems = cartItems;
      },
      updateCart: (state, action) => {
        state.cart.cartItems = action.payload;
      },
      removeCartItem: (state, action) => {
        const cartItems = state.cart.cartItems.filter((item) => item._key !== action.payload._key);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        state.cart.cartItems = cartItems;
      },
       clearCart: (state) => {
        localStorage.removeItem("cartItems");
        state.cart.cartItems = [];
      },
      addShippinAddress: (state, action) => {
        const newItem = action.payload;
        const existItem = state.cart.shippingAddress.find((item) => item._key === newItem._key);
        const shippingAddress = existItem
          ? state.cart.shippingAddress.map((item) => (item._key === existItem._key ? newItem : item))
          : [...state.cart.shippingAddress, newItem];
        localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
        state.cart.shippingAddress = shippingAddress;
      },
      updateShippingAddress: (state, action) => {
        state.cart.shippingAddress = action.payload;
      },
    logout: (state) => {
        localStorage.removeItem('token') // delete token from storage
        localStorage.removeItem('user')
        state.loading = false
        state.users = null
        state.token = null
        state.error = null
      },
      saveShippingAddress: (state, action) => {
        state.cart.shippingAddress = action.payload;
      },
      savePaymentMethod: (state, action) => {
        state.cart.paymentMethod = action.payload;
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
        (state) => {
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
    updateCart,
    setBrands,
    setProducts, 
    setUserReset, 
    setUserUpdate,
    setWelcomeInfo,
    addCartItem,
    removeCartItem,
    clearCart,
    updateUser,
    saveShippingAddress,
    savePaymentMethod,
    setWelcomeNoInfo, 
    addShippinAddress, 
    updateShippingAddress
  } = authSlice.actions

  export default authSlice.reducer;
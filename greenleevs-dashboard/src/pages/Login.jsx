import React from 'react'
import { FcGoogle } from 'react-icons/fc';
import logo from '../data/logo.png';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useStateContext } from '../contexts/ContextProvider';
import jwt_decode from "jwt-decode";
import { useForm } from 'react-hook-form';
import { LoginUser } from '../apis/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { dispatch  } = useStateContext();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const responseGoogle = (response) => {
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    const { email, sub } = userObject;
    const bodyData = {
      email: email,
      sub: sub,
    }
    try {
      LoginUser(bodyData)
      .then(response => {
        console.log(response);
        const responseStatus = response.status
        const responseStatusOne = response.data.status

        if (responseStatus || responseStatusOne === 'success' || 200) {
          toast('Login Successful', { type: 'success'});
          navigate('/')
        } else {
          toast("Login failed", { type: 'error' });
        }
          
        console.log("responseStatus ",responseStatus);
        const { token } = response.data
        localStorage.setItem('token', token);
      });
      dispatch({ type: 'USER_LOGIN', payload: bodyData });
      localStorage.setItem('user', JSON.stringify(bodyData));
    } catch (error) {
      toast('Login Unautorized', { type: 'error' });
    }
  }
 
  const submitHandler = async (data) => {
    console.log("Data", data );

    const bodyData =  {
      email: data.email,
      password: data.password,
    }
    try {
    LoginUser(bodyData) 
      .then(response => {
        console.log(response);
        const responseStatus = response.status
        const responseStatusOne = response.data.status

        if (responseStatus || responseStatusOne  === 'success' || 200) {
          toast('Login Successful',
            {type : 'success', 
             theme: "colored"
             });
             navigate('/')
        } else {
          toast("Login failed", { type: 'error',   theme: "colored"  });
        }
        const { token } = response.data
        localStorage.setItem('token', token);
        dispatch({type : 'ADD_TOKEN', payload: token});
      });
      dispatch({ type: 'USER_LOGIN', payload: bodyData});
      localStorage.setItem('user', JSON.stringify(bodyData));
      navigate('/');
      toast('Login Successful', { type: 'success',theme: "colored" });
    } catch (error) {
      toast('Invalid email or password', { type: 'error', theme: "colored" });
    }
  };

  return (
        <div className="container mx-auto flex items-center min-h-screen p-6 justify-center">
        <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl'>
        <div className='flex flex-col overflow-y-auto md:flex-row'>
        <div className='h-32 md:h-auto md:w-1/2'>
               <img src={logo} className="object-cover w-full h-full" alt='logo' />   
        </div>

      <div className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
        <div className='w-full'>
          <h1 className='mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200'>Login</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div>
              <div>
                <label
                  htmlFor="email"
                 className={`block pb-3 text-sm 2 ${
                  errors.email ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Your Email</label>
                <input 
                name="email" 
                id="email" 
                type="text" 
                placeholder='developer@gmail.com'
                required={true}
                {...register("email", { 
                  required: "Email is Required!!!" ,
                 pattern: {
                   value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                   message: "Invalid email address",
                 }})}
                className={`block w-full ${
                  errors.email ? "text-red-400 border-red-400" : "text-gray-700 "} px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  />
                   {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    A valid email is required.
                  </p>
                )}
              </div>
              <div className='mt-6'>
                 <label
                 htmlFor='password' 
                 className={`block pb-3 text-sm 2 ${
                  errors.password ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}
                  >Your Password</label>
                 <input 
                  name="password" 
                  id="password" 
                  placeholder='*****'
                  autoComplete='on'
                  required={true}
                  {...register("password", { 
                    required: "You must specify a password",
                  })}
                  className={`block w-full ${
                    errors.password ? "text-red-400 border-red-400" : "text-gray-700 "} px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  type="password" 
                    />
                  {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    Your password is required.
                  </p>
                )}
              </div>
              <button 
              className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-[#1F451A] border border-transparent active:bg-[#1F451A] hover:bg-[#1F451A] focus:ring focus:ring-purple-300 mt-4 h-12 w-full" type="submit"><a href='/'>Log in</a></button>
            </div>
      
    
        <hr className='my-10' />
        <div className="">
          <GoogleOAuthProvider 
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              >
          <GoogleLogin
            render={(renderProps) => (
              <button
                type="button"
                className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2  md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-red-500 h-11 md:h-12 w-full"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="" />Login with google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
          </GoogleOAuthProvider>
        </div>    
        </form>
      
        <p className="mt-4"><a className="text-sm font-medium text-[#1F451A] hover:underline" 
        href="/forgotPassword">Forgot your password ?</a></p>
        <p className="mt-1"><a className="text-sm font-medium text-[#1F451A] hover:underline" 
        href="/register">Create account</a></p>
        </div>
        </div> 
        </div>
        </div>
    </div>
  )
}

export default Login
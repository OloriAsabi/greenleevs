import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import logo from '../data/logo.png';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useStateContext } from '../contexts/ContextProvider';
import jwt_decode from "jwt-decode";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { RegisterUser } from '../apis/api';

const Register = () => {
  const { dispatch  } = useStateContext();
  const navigate = useNavigate()
 

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger
  } = useForm();

  const responseGoogle = (response) => {
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    localStorage.setItem('user', JSON.stringify(userObject));
    const { name, email, sub } = userObject;
    const bodyData = {
      username: name ,
      email: email,
      sub: sub,
    }
    try {
    RegisterUser(bodyData)
    .then(response => {
      console.log(response);
      const { token } = response.data
      const responseStatus = response.status
      const responseStatusOne = response.data.status
  

      if (responseStatus || responseStatusOne === 'success' || 200 || 201) {
        toast('Registered Successful' , { type: 'success' });
      } else {
        toast("Registration failed" , { type: 'error'});
      }       
      localStorage.setItem('token', token);
      navigate('/');
    });
    dispatch({ type: 'USER_LOGIN', payload: bodyData });
    localStorage.setItem('user', JSON.stringify(bodyData));
    } catch (error) {
      toast("Registration failed", { type: 'error' });
    }
  }

  const submitHandler = async (data) => {
    console.log("Data",  data );
    if (data.password !== data.confirmPassword) {
      toast("Passwords don't match", { type: 'error' });
      return;
    }
    const bodyData =  {
      username: data.username ,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword
    }
    try {
      RegisterUser(bodyData)
      .then(response => {
        console.log(response);
        const { token } = response.data
        const responseStatus = response.status
        const responseStatusOne = response.data.status

        if (responseStatus || responseStatusOne === 'success' || 200 || 201) {
          toast('Registered Successful',{ type:  'success',  theme: "colored" });
        } else {
          toast("Registration failed" , { type: 'error', theme: "colored" });
        }
        localStorage.setItem('token', token);
        dispatch({type : 'ADD_TOKEN', payload: token});
      });
      dispatch({ type: 'USER_LOGIN', payload: bodyData});
      localStorage.setItem('user', JSON.stringify(bodyData));
      navigate('/');
      toast('Registered Successful', { type: 'success',   theme: "colored" });
    } catch (error) {
      toast("Registration failed", { type: 'error',   theme: "colored" });
    }
  }

  return (
    <div className="container mx-auto flex items-center min-h-screen p-6 justify-center">
    <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl'>
    <div className='flex flex-col overflow-y-auto md:flex-row'>
    <div className='h-32 md:h-auto md:w-1/2'>
           <img src={logo} className="object-cover w-full h-full" alt='logo' />   
    </div>

  <div className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
    <div className='w-full'>
        <h1 className='mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200'>Register</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
        <div>
          <label
                  htmlFor="username"
                 className={`block pb-3 text-sm 2 ${
                  errors.username ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Username</label>
            <input 
                name="username" 
                id="username" 
                type="text" 
                placeholder='OloriA'
                className={`block w-full ${
                  errors.username ? "text-red-400 border-red-400" : "text-gray-700 "} px-3  mb-2 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register("username", { required: "Username is Required!!!" })}
                 onKeyUp={() => {
                  trigger("username");
                }}
                  required={true}
                  />
                   {errors.username && (
                  <p className="text-red-500 text-sm mt-2">
                  Username is Required!!!
                  </p>
                )}
          </div>
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
                className={`block w-full ${
                  errors.email ? "text-red-400 border-red-400" : "text-gray-700 "} px-3 py-1 mb-2 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register("email", { 
                    required: "Email is Required!!!" ,
                   pattern: {
                     value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                     message: "Invalid email address",
                   }})}
                   onKeyUp={() => {
                     trigger("email");
                   }}
                  required={true}
                  />
                   {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    Email is Required!!!
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
                  required={true}
                  className={`block w-full ${
                    errors.password ? "text-red-400 border-red-400" : "text-gray-700 "} px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  type="password" 
                  autoComplete='on'
                  {...register("password", { 
                    required: "You must specify a password",
                  pattern: {
                    value: '^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$',
                    message: "Password should contain atleast one number and one special character",
                  },
                  minLength: {
                  value: 8,
                  message: "Password must be more than 8 characters"
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be less than 20 characters"
                    },
                  })}
                  onKeyUp={() => {
                    trigger("password");
                  }}
                  />
                  {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    Password should contain atleast one number and one special character
                  </p>
                )}
          </div>
          <div className='mt-6'>
             <label
             htmlFor='confirmPassword' 
             className={`block pb-3 text-sm 2 ${
              errors.confirmPassword ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Confirm Your Password</label>
             <input 
              name="confirmPassword" 
              id="confirmPassword" 
              autoComplete='off'
              required={true}
              {...register( 'confirmPassword', {
                validate: value =>
                  value === watch("password") || "The passwords do not match"
              })}  
              placeholder='*****'
              className='block w-full px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white'
              type="password"
              onPaste={(e) =>{
                e.preventDefault();
                return false
               }}
               onKeyUp={() => {
                trigger("confirmPassowrd");
              }}
              />
               {errors.confirmPassword && (
                <p  className="text-red-500 text-sm mt-2">The passwords do not match</p>
              )}
          </div>
          <button 
          className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-[#1F451A] border border-transparent  hover:bg-[#1F451A] focus:ring
           focus:ring-purple-300 mt-4 h-12 w-full" type="submit" to="/">
              Create account
            </button>
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
            <FcGoogle className="" /> Sign Up with google
          </button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />
      </GoogleOAuthProvider>
    </div>    
    </form>
    <p className="mt-1"><a className="text-sm font-medium text-[#1F451A] hover:underline" 
        href="/login">Login</a></p>
    </div>
    </div> 
    </div>
    </div>
</div>
  )
}

export default Register
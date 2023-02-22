import React from 'react'
import logo from '../data/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { LoginUser } from '../apis/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setToken, setUserLogin, startLoading } from '../reducers/auth';
import { Spinner } from '../components';

const Login = () => {
  const  dispatch  = useDispatch();
  const { loading } = useSelector((state) => state.auth)

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
 
  const submitHandler = async (data) => {
    const bodyData =  {
      email: data.email,
      password: data.password,
    }
      try {
        await LoginUser(bodyData) 
          .then(response => {
            const responseStatus = response.status
            const responseStatusOne = response.data.status
    
            if (responseStatus === 200 && responseStatusOne === 'success') {
              toast.success('Login Successful');
                 navigate('/')
            } else {
              toast.error("Login failed");
            }
            const { token } = response.data
            if (token !== '') {
              console.log('check dummy');
               dispatch(setToken(token));
              localStorage.setItem('token', token);
              navigate("/");
            }
            else if (token !== '') {
              console.log('Check Response:', response.data);
            }
          });
          startLoading();
          dispatch(setUserLogin(bodyData));
          localStorage.setItem('user', JSON.stringify(bodyData));
          navigate('/');
          toast.error('Login Successful');
        } catch (error) {
          console.log(error);
          toast.error("Login failed")
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
              className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-[#1F451A] border border-transparent active:bg-[#1F451A] hover:bg-[#1F451A] focus:ring focus:ring-purple-300 mt-4 h-12 w-full" 
              type="submit"
              >
                  {loading ? <Spinner /> : 'Login'}</button>
            </div>
      
    
        <hr className='my-10' /> 
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
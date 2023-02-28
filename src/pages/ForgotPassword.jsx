import logo from '../assests/logo.png';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { UserForgotPassword } from '../apis/api';
import { getError } from '../data/error';
import { setToken } from '../reducers/auth';
import { useDispatch } from 'react-redux';

  /* eslint-disable */
const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    const bodyData =  {
      email: data.email,
    }
    try {
      UserForgotPassword(bodyData)
      .then(response => {
        const responseStatus = response.status
        const responseStatusOne = response.data.status

        if (responseStatus === 200 && responseStatusOne === 'success') {
          toast.success('Reset Password Sent');
          navigate('/resetPassword')
        } else {
          toast.error("Reset Password failed");
        }
        const { token } = response.data
        localStorage.setItem('token', token);
        dispatch(setToken(token));
      });
    } catch (error) {
      toast.error(getError(error));
    }
  }
  return (
    <div className="container mx-auto flex items-center min-h-screen p-6 justify-center">
    <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl'>
    <div className='flex flex-col overflow-y-auto md:flex-row'>
    <div className='h-32 md:h-auto md:w-1/2'>
      <img src={logo} className="object-cover w-full h-full" alt='logo' />   
    </div>

  <div className='flex items-center justify-center p-6 sm:p-12 md:w-1/2"'>
    <div className='w-full'>
        <h1 className='mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200'>Forgot Password</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <div>
            <label
             className='block pb-3 text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm"'>Your Email</label>
            <input 
            name="email" 
            id="email" 
            type="email" 
            placeholder='developer@gmail.com'
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
          <button 
          className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-[#1F451A] border border-transparent active:bg-[#1F451A] hover:bg-[#1F451A] focus:ring focus:ring-purple-300 mt-4 h-12 w-full" type="submit">
             Recover Password
            </button>
        </div>
      </form>

    <hr className='my-10' /> 
    <p className="mt-1">
      <a className="text-sm font-medium text-[#1F451A] hover:underline" href="/login">Already have an account? Login</a>
      </p>
    </div>
    </div> 
    </div>
    </div>
</div>
  )
}

export default ForgotPassword
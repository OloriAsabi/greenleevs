import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assests/logo.png'
// import { useStateContext } from '../contexts/ContextProvider';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
// import { UserResetPassword } from '../apis/api';

const ResetPassword = () => {
    // const { dispatch  } = useStateContext();
    const navigate = useNavigate()
   
    const { enqueueSnackbar } = useSnackbar();
  
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
      trigger
    } = useForm();


  const submitHandler = async (data) => {
    console.log("Data",  data );
    // if (data.password !== data.confirmPassword) {
    //   enqueueSnackbar("Passwords don't match", { variant: 'error' });
    //   return;
    // }
    // const bodyData =  {
    //   token: '',
    //   email: data.email,
    //   password: data.password,
    //   password_confirmation: data.confirmPassword
    // }
    // try {
    //   UserResetPassword(bodyData)
    //   .then(response => {
    //     console.log(response);
    //     const { token } = response.data
    //     localStorage.setItem('token', token);
    //     console.log(localStorage.getItem(token));
    //   });
    //   dispatch({ type: 'USER_LOGIN', payload: bodyData});
    //   localStorage.setItem('user', JSON.stringify(bodyData));
    //   navigate('/');
    //   enqueueSnackbar('Registered Successful', { variant: 'success' });
    // } catch (error) {
    //   enqueueSnackbar("Registration failed", { variant: 'error' });
    // }
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
        <h1 className='mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200'>Reset Password</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          {/* <div>
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
          </div>    */}
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
              errors.email ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Confirm Your Password</label>
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
              Reset Password
            </button>
        </div>
    </form>
    </div>
    </div> 
    </div>
    </div>
</div>
  )
}

export default ResetPassword
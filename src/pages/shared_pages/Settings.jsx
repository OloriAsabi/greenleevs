import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
import { useSnackbar } from 'notistack';
import { getError } from '../../data/error';
import { UpdateUser } from '../../apis/api';

const Settings = () => {
    /* eslint-disable */

  const history = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors }
  } = useForm();

  const { dispatch, state } = useStateContext();
  const { user } = state;

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if(!user) {
    history("/login")
    }
    setValue('first_name', user.firstName);
    setValue('last_name', user.lastName);
    setValue('email', user.email);
    setValue('old_password', user.oldPassword);
    setValue('new_password', user.newPassword)
  }, [history, user]);
  
  const submitHandler = (data) => {
    console.log(data);
    if (data.newPassword !== data.confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: 'error' });
      return;
    }
    const bodyData =  {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      old_password: data.oldPassword,
      new_password: data.newPassword,
      password_confirmation: data.confirmPassword
    }
    try {
      UpdateUser(bodyData);
      dispatch({ type: 'USER_UPDATE', payload: bodyData});
      localStorage.setItem('user', JSON.stringify(bodyData));    
      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(getError(error), { variant: 'error' });
    }

  };
  return (
    <div>
      <div className='container mx-auto small my-8 p-10'>
      <div className='flex justify-between items-center gap-1'>
      <h4 className='text-3xl font-bold pb-5'>Settings</h4>
      </div>
      <p className='text-[#2D2D2D] pb-5'>Change your Name/Password</p>

      <form onSubmit={handleSubmit(submitHandler)} className="w-full h-full p-5">
          <div>                          
              <div className='flex flex-col w-full '>
                <label
                  htmlFor="email"
                  className={` pb-3 text-sm 2 ${
                    errors.email ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Email Address</label>
                <input 
                  name="email" 
                  id="email" 
                  type="email" 
                  placeholder='developer@gmail.com'
                  required={true}
                  {...register('email', { 
                    required: 'Email is Required!!!' ,
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: 'Invalid email address',
                    }})}
                  className={`block w-full ${
                    errors.email ? 'text-red-400 border-red-400' : 'text-gray-700 '}  py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    A valid email is required.
                  </p>
                )}
              </div>

              <div className='flex justify-between gap-10 pt-10 w-full'>
              <div className='flex flex-col w-full'>
                <label
                  htmlFor="firstName"
                  className={` pb-3 text-sm 2 ${
                    errors.firstName ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>First Name</label>
                <input 
                  name="firstName" 
                  id="firstName" 
                  type="text" 
                  placeholder='Johnson'
                  required={true}
                  {...register('firstName', { 
                    required: 'First Name is Required!!!' ,
                  })}
                  className={`block w-full ${
                    errors.firstName ? 'text-red-400 border-red-400' : 'text-gray-700 '}  py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-2">
                   First Name is required.
                  </p>
                )}
              </div>
              <div className='flex flex-col w-full'>
                <label
                  htmlFor="lastName"
                  className={` pb-3 text-sm 2 ${
                    errors.lastName ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Last Name</label>
                <input 
                  name="lastName" 
                  id="lastName" 
                  type="lastName" 
                  placeholder='Abraham'
                  required={true}
                  {...register('lastName', { 
                    required: 'Last Name is Required!!!' ,
                  })}
                  className={`block w-full ${
                    errors.lastName ? 'text-red-400 border-red-400' : 'text-gray-700 '} py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-2">
                    Last Name is required.
                  </p>
                )}
              </div>

            </div>
            <h4 className='text-3xl font-bold pb-5 pt-5'>Password</h4>
            <p className='text-[#2D2D2D]'>Edit only if you want to change your password</p>

            <div className='grid grid-cols-2 justify-between gap-10 pt-10 w-full'>
            <div className='flex flex-col'>
            <label
                  htmlFor="oldPassword"
                  className={` pb-3 text-sm 2 ${
                    errors.oldPassword ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Old Password</label>
                    <input 
                      name="oldPassword" 
                      id="oldPassword" 
                      placeholder='******'
                      required={true}
                      className={`block w-full ${
                        errors.oldPassword ? 'text-red-400 border-red-400' : 'text-gray-700 '} px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                      type="password" 
                      autoComplete='on'
                      {...register('oldPassword', { 
                        required: 'You must specify a password',
                        pattern: {
                          value: '^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$',
                          message: 'Password should contain atleast one number and one special character',
                        },
                        minLength: {
                          value: 8,
                          message: 'Password must be more than 8 characters'
                        },
                        maxLength: {
                          value: 20,
                          message: 'Password must be less than 20 characters'
                        },
                      })}
                      onKeyUp={() => {
                        trigger('password');
                      }}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-2">
                    Old Password doesn't match
                      </p>
                    )}
                  </div>
                  <div className='flex flex-col '>
            <label
                  htmlFor="newPassword"
                  className={` pb-3 text-sm 2 ${
                    errors.newPassword ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>New Password</label>
                    <input 
                      name="newPassword" 
                      id="newPassword" 
                      placeholder='******'
                      required={true}
                      className={`block w-full ${
                        errors.newPassword ? 'text-red-400 border-red-400' : 'text-gray-700 '} px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                      type="password" 
                      autoComplete='on'
                      {...register('newPassword', { 
                        required: 'You must specify a password',
                        pattern: {
                          value: '^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$',
                          message: 'Password should contain atleast one number and one special character',
                        },
                        minLength: {
                          value: 8,
                          message: 'Password must be more than 8 characters'
                        },
                        maxLength: {
                          value: 20,
                          message: 'Password must be less than 20 characters'
                        },
                      })}
                      onKeyUp={() => {
                        trigger('password');
                      }}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-2">
                          Password should contain atleast one number and one special character
                      </p>
                    )}
                  </div>
                  <div className='flex flex-col'>
                  <label
                  htmlFor="confirmPassword"
                  className={` pb-3 text-sm 2 ${
                    errors.confirmPassword ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Confirm New Password</label>
                    <input 
                      name="confirmPassword" 
                      id="confirmPassword" 
                      autoComplete='off'
                      required={true}
                      {...register( 'confirmPassword', {
                        validate: value =>
                          value === watch('newPassword') || 'The passwords do not match'
                      })}  
                      placeholder='*****'
                      className='block w-full px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white'
                      type="password"
                      onPaste={(e) =>{
                        e.preventDefault();
                        return false;
                      }}
                      onKeyUp={() => {
                        trigger('confirmPassowrd');
                      }}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-2">The passwords do not match</p>
                    )}
                  </div>
             </div>
            <hr/>
            <div className='mt-5'>
              <div className='block'>
                <button className='bg-[#1F451A] text-white w-full  rounded text-center cursor-pointer p-3 font-normal'>
                SAVE NEW SETTINGS
                </button>
              </div>     
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Settings
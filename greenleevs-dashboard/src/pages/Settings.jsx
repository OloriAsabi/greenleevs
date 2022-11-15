import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components'
import { useStateContext } from '../contexts/ContextProvider';
import { useSnackbar } from 'notistack';
import { UpdateUser } from '../apis/api';
import { getError } from '../utils/error';

const Settings = () => {
  const {dispatch, state} = useStateContext();
  const { user } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate("/login")
    }
    setValue('name', user.name);
    setValue('email', user.email);
  }, [navigate, user]);

  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const submitHandler = async (data) => {
    console.log(data);
    const bodyData =  {
      username: data.username,
      email: data.email,
    }
    try {
      UpdateUser(bodyData);
      dispatch({ type: 'USER_UPATE', payload: bodyData});
      localStorage.setItem('user', JSON.stringify(bodyData));    
      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(getError(error), { variant: 'error' });
    }

  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header title="Edit Profile" />
   
    <div className='container p-6 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg'>
      <form  onSubmit={handleSubmit(submitHandler)}>
        <div className='p-6 flex-grow scrollbar-hide w-full mb-6 scrollbar-hide max-h-full'>
        <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
        <label className='block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm"'>
        Name
        </label>
        <div className="col-span-8 sm:col-span-4">
          <input 
          className={`block w-full ${
          errors.username ? "text-red-400 border-red-400" : "text-gray-700 "} px-3  mb-2 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
          {...register("username", { required: "Username is Required!!!" })}
          type="text" name="username" placeholder="Your Name"/>
           {errors.username && (
                  <p className="text-red-500 text-sm mt-2">
                  Username is Required!!!
                  </p>
            )}
        </div>
        </div>
        <div className='grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'>
        <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">Email</label>
        <div className="col-span-8 sm:col-span-4">
          <input
          {...register("email", { 
            required: "Email is Required!!!" ,
           pattern: {
             value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
             message: "Invalid email address",
           }})}
           className={`block w-full ${
            errors.email ? "text-red-400 border-red-400" : "text-gray-700 "} px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
          type="text"
           name="email"
          placeholder="Email" />
            {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    A valid email is required.
                  </p>
            )}
        </div>
        </div>
        <div className="flex flex-row-reverse pr-6 pb-6">
          <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-[#1F451A] border border-transparent active:bg-[#1F451A] hover:bg-[#1F451A] focus:ring focus:ring-purple-300 h-12" 
          type="submit"> 
        Update Profile</button></div>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Settings
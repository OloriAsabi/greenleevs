import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useStateContext } from '../contexts/ContextProvider';
import { useSnackbar } from 'notistack';
import 'react-tagsinput/react-tagsinput.css';
import { CreateCustomers } from '../apis/api';

const CustomerModal = ({ toggleMenu, setToggleMenu }) => {
  const { dispatch  } = useStateContext();
  const navigate = useNavigate()

  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm({ mode: 'onBlur', reValidateMode: 'onBlur' })

  const submitHandler = async (data) => {
    console.log("Data Product Modal", data);

    const body = {
      username: data.username ,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phone,
    };

    console.log('Body',body);
    try {
      CreateCustomers(body)
       .then(response => {
        console.log(response);
        const responseStatus = response.data.status

        if (responseStatus) {
          enqueueSnackbar('Customer created Successful', { variant: responseStatus });
        } else {
          enqueueSnackbar("Customer creation failed" , { variant: responseStatus });
        }
          
        console.log("responseStatus ",responseStatus);
      });
      dispatch({ type: 'ADD_CUSTOMERS', payload: body});
      localStorage.setItem('products', JSON.stringify(body));
      navigate('/customers');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main
    className={
      " fixed overflow-hidden z-10 overflow-y-scroll bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
      ( toggleMenu
        ? " transition-opacity opacity-100 duration-500 translate-x-0  "
        : " transition-all opacity-0 translate-x-full")
    }>
      <section
      className={
        " w-screen max right-0 absolute overflow-y-scroll bg-white shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
        (toggleMenu ? " translate-x-0 " : " translate-x-full ")
      }
      >
        <article
        className='relative w-screen max mb-5 pb-10 grid grid-rows space-y-6 h-full overflow-y-scroll'>
        <div className='flex justify-between m-10'>
        <header className="p-4 font-bold text-lg">Add Customers</header>
        <MdOutlineCancel
        className="mr-5 mt-4 cursor-pointer text-red-500"
        onClick={() => {
          setToggleMenu(false);
        }}
        fontSize={28}
        />
       </div>
        <div className="w-full text-center justify-center items-center pr-10 pl-10">
        <div className="">
          <form 
          className="gap-10" 
          onSubmit={handleSubmit(submitHandler)}>
       <div className='flex justify-between space-x-5  mb-6'>
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
         <div className='flex justify-between space-x-5'>
          <label
                  htmlFor="first_name"
                 className={` pb-3 text-sm 2 ${
                  errors.first_name ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>First Name: </label>
            <input 
                name="first_name" 
                id="first_name" 
                type="text" 
                placeholder='OloriA'
                className={`block w-full ${
                  errors.first_name ? "text-red-400 border-red-400" : "text-gray-700 "} px-3  mb-2 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register("first_name", { required: "First Name is Required!!!" })}
                 onKeyUp={() => {
                  trigger("first_name");
                }}
                  required={true}
                  />
                   {errors.first_name && (
                  <p className="text-red-500 text-sm mt-2">
                  First name is Required!!!
                  </p>
                )}
          </div>
          <div  className='flex justify-between space-x-10 mt-6'>
          <label
                  htmlFor="last_name"
                 className={`block pb-3 text-sm 2 ${
                  errors.last_name ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Last Name</label>
            <input 
                name="last_name" 
                id="last_name" 
                type="text" 
                placeholder='OloriA'
                className={`block w-full ${
                  errors.last_name ? "text-red-400 border-red-400" : "text-gray-700 "} px-3  mb-2 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register("last_name", { required: "Last Name is Required!!!" })}
                 onKeyUp={() => {
                  trigger("last_name");
                }}
                  required={true}
                  />
                   {errors.last_name && (
                  <p className="text-red-500 text-sm mt-2">
                  Lagos name is Required!!!
                  </p>
                )}
          </div>
          <div  className='flex justify-between space-x-5 mt-6'>
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
          <div  className='flex justify-between space-x-5 mt-6'>
            <label     
             htmlFor="phone"
              className={`block pb-3 text-sm 2 ${
                  errors.phone ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Phone number</label> 
                    <input
                name='phone'
                type="text"
                className={`block w-full ${
                    errors.phone ? "text-red-400 border-red-400" : "text-gray-700 "} px-3 py-1 mb-2 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}  
                {...register("phone", { 
                  required: "Phone Number is Required!!!",
                  pattern: {
                    value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    message: "Invalid phone no",
                  },
                })}
                onKeyUp={() => {
                  trigger("phone");
                }}
              />
              {errors.phone && (
                <p className="text-danger">Phone Number is Required!!!</p>
              )}
         </div> 
         {/* <div  className='flex justify-between space-x-5 mt-6'>
            <label     
              htmlFor="address"
              className={`block pb-3 text-sm 2 ${
                  errors.address ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Address</label> 
              <input
                name='address'
                type="text"
                className={`block w-full ${
                    errors.address ? "text-red-400 border-red-400" : "text-gray-700 "} px-3 py-1 mb-2 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}  
                {...register("address", { 
                  required: "Address is Required!!!",
                 
                })}
                onKeyUp={() => {
                  trigger("address");
                }}
              />
              {errors.address && (
                <small className="text-danger">Address is Required!!!</small>
              )}
         </div>  */}
              <div className="flex justify-end items-end mt-5">
                <button
                  type="submit"
                  className="bg-[#1F451A] text-white hover: cursor-pointer p-4 rounded"
                >
                Add Customers
                </button>
              </div>
          </form>
        </div>
        </div>
        </article>
      </section>
    </main>
  )
}

export default CustomerModal
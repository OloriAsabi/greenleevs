/* eslint-disable */
import React from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineArrowNarrowLeft} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import PaymentDetails from './PaymentDetails';

const BillingDetails = () => {
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };

  const showPayment = () => {
    if (window.location.pathname === '/payment') {
      return <PaymentDetails />;
    }
  };
    
  // const onClick = (event) => {
  //   event.preventDefault();
  // };

    
  return (
    <div>
      <div className='container mx-auto'>
        <form onSubmit={handleSubmit(submitHandler)} className="w-full h-full p-5">
          <div>

            <div className='flex justify-between gap-10 pt-10 w-full'>
              <div className='flex flex-col w-full'>
                <label
                  htmlFor="name"
                  className={` pb-3 text-sm 2 ${
                    errors.name ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>First Name</label>
                <input 
                  name="name" 
                  id="name" 
                  type="text" 
                  placeholder='Johnson'
                  required={true}
                  {...register('name', { 
                    required: 'Name is Required!!!' ,
                  })}
                  className={`block w-full ${
                    errors.name ? 'text-red-400 border-red-400' : 'text-gray-700 '}  py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">
                    Name is required.
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
                            
            <div className='flex justify-between gap-10 pt-10 w-full'>
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
              <div className='flex flex-col w-full'>
                <label
                  htmlFor="phone"
                  className={` pb-3 text-sm 2 ${
                    errors.phone ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Phone Number</label>
                <input 
                  name="phone" 
                  id="phone" 
                  type="tel" 
                  placeholder='Enter Number'
                  required={true}
                  {...register('phone', { 
                    required: 'Phone Number is Required!!!' ,
                  })}
                  className={`block w-full ${
                    errors.phone ? 'text-red-400 border-red-400' : 'text-gray-700 '} py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-2">
                    A valid phone number is required.
                  </p>
                )}
              </div>

            </div>
            <div className='flex justify-between gap-10 pt-10 w-full'>
              <div className='flex flex-col w-full'>
                <label
                  htmlFor="country"
                  className={` pb-3 text-sm 2 ${
                    errors.country ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Select Country</label>
                <select id="country"  
                  className={`w-full ${
                    errors.country ? ' border-red-400' : ''} rounded-xl border p-4 text-gray-500 cursor-pointer`}
                  {...register('country')}>
                  <option defaultValue="select" value="">select country</option>
                  <option value="orange">Orange</option>
                  <option value="yellow">Yellow</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="indigo">Indigo</option>
                  <option value="violet">Violet</option>
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-2">
                  Select a valid country
                  </p>
                )}
              </div>
              <div className='flex flex-col w-full'>
                <label
                  htmlFor="postCode"
                  className={` pb-3 text-sm 2 ${
                    errors.postCode ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Post Code</label>
                <input 
                  name="postCode" 
                  id="postCode" 
                  type="number"
                  placeholder='Enter Post Code'
                  required={true}
                  {...register('postCode', { 
                    required: 'Enter A Correct Post Code' ,
                  })}
                  className={`block w-full ${
                    errors.postCode ? 'text-red-400 border-red-400' : 'text-gray-700 '} py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                />
                {errors.postCode && (
                  <p className="text-red-500 text-sm mt-2">
                    Please Enter A Correct Post Code
                  </p>
                )}
              </div>

            </div>

            <div className='flex flex-col pt-5'>
              <label
                htmlFor="address"
                className={` pb-3 text-sm 2 ${
                  errors.address ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Address Line 1</label>
              <input 
                name="address" 
                id="address" 
                type="text" 
                placeholder='Enter address'
                required={true}
                {...register('address', { 
                  required: 'Address is Required!!!' ,
                })}
                className={`block w-full ${
                  errors.address ? 'text-red-400 border-red-400' : 'text-gray-700 '} py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-2">
                    A valid address is required.
                </p>
              )}
            </div>
            <div className='flex flex-col pt-5'>
              <label
                htmlFor="address"
                className={` pb-3 text-sm 2 ${
                  errors.address ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Address Line 2</label>
              <input 
                name="address" 
                id="address" 
                type="text" 
                placeholder='Enter address'
                required={true}
                {...register('address', { 
                  required: 'Address is Required!!!' ,
                })}
                className={`block w-full ${
                  errors.address ? 'text-red-400 border-red-400' : 'text-gray-700 '} py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-2">
                    A valid address is required.
                </p>
              )}
            </div>
            <div className='flex justify-between gap-10 pb-10 pt-10 w-full'>
              <div className='flex flex-col w-full'>
                <label
                  htmlFor="city"
                  className={` pb-3 text-sm 2 ${
                    errors.city ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Town/City</label>
                <input 
                  name="city" 
                  id="city" 
                  type="text" 
                  placeholder='Enter Town or City'
                  required={true}
                  {...register('city', { 
                    required: 'City is Required ' ,
                  })}
                  className={`block w-full ${
                    errors.city ? 'text-red-400 border-red-400' : 'text-gray-700 '}  py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-2">
                    A valid city or town is required .
                  </p>
                )}
              </div>
              <div className='flex flex-col w-full'>
                <label
                  htmlFor="state"
                  className={` pb-3 text-sm 2 ${
                    errors.state ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>State</label>
                <select id="state"  
                  className={`w-full ${
                    errors.email ? ' border-red-400' : ''} rounded-xl border p-4 text-gray-500 cursor-pointer`}
                  {...register('state')}>
                  <option defaultValue="select" value="">select state</option>
                  <option value="orange">Orange</option>
                  <option value="yellow">Yellow</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="indigo">Indigo</option>
                  <option value="violet">Violet</option>
                </select>
                {errors.state && (
                  <p className="text-red-500 text-sm mt-2">
                  Select a valid state
                  </p>
                )}
              </div>
            </div>
            <hr/>
            <div className='flex justify-between mt-5'>
              <div className='block text-start'>
                <button className='text-[#1F451A] flex rounded items-center cursor-pointer gap-4 font-normal' onClick={() => history('/carts')}>
                  <HiOutlineArrowNarrowLeft fontSize={28}/> Back to cart
                </button>
              </div>
              <button 
                className=' text-center mt-5 bg-[#1F451A] text-white cursor-pointer rounded-md p-4 w-42'
                onClick={() => showPayment()}>
                    Go To Payment  
                {/* {showPayment()} */}
              </button>           
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillingDetails;
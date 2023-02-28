/* eslint-disable */
import React from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineArrowNarrowLeft} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { City, Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import Selector from "./Selector";
import { toast } from 'react-toastify';
import { PostOrders } from '../apis/api';
import PaymentDetails from './PaymentDetails';
import { useDispatch } from 'react-redux';
import { addShippinAddress } from '../reducers/auth';


const BillingDetails = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  const handlePaymentClick = () => {
    setStep(2);
  };

  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();

  const [country, setCountry] = useState(countryData[232]);
  const [state, setState] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitHandler = async (data) => {
    const body = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      phone: data.phone,
      country: country.isoCode,
      postcode: data.postCode,
      addressline1: data.address,
      addressline2: data.addressLine2,
      city: city.name,
      state: state.isoCode
    }
    try {
      await PostOrders(body) 
        .then(res => {
          if (res.status === 200) {
            dispatch(addShippinAddress(body))
            toast.success('Successfully Updated Billing Info');
          } else (error) => {
            toast.error(error);
          }
        });        
      } catch (error) {
        toast.error(error)
      }

  };
    
  return (
    <div>
      <div className='container mx-auto'>
      {step === 1 && (
        <div>
        <form onSubmit={handleSubmit(submitHandler)} className="w-full h-full p-5">
          <div>
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
                    required: 'Name is Required!!!' ,
                  })}
                  className={`block w-full ${
                    errors.firstName ? 'text-red-400 border-red-400' : 'text-gray-700 '}  py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
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
                <p
                  className={` pb-3 text-sm 2 ${
                    errors.country ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Select Country</p>
                  <Selector
                    data={countryData}
                    selected={country}
                    setSelected={setCountry}
                  />
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
                {...register('addressLine2', { 
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
                  {city && (
            <div>
              <p className={` pb-3 text-sm 2 ${
                    errors.city ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Town/City :</p>
              <Selector data={cityData} selected={city} setSelected={setCity} />
            </div>
              )}
              </div>
              <div className='flex flex-col w-full'>
              {state && (
                <div>
                  <p  className={` pb-3 text-sm 2 ${
                    errors.city ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>State :</p>
                  <Selector
                    data={stateData}
                    selected={state}
                    setSelected={setState}
                  />
                </div>
              )}
              </div>
            </div>
            <button 
              className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-[#1F451A] border border-transparent active:bg-[#1F451A] hover:bg-[#1F451A] focus:ring focus:ring-purple-300 mt-4 h-12 w-full" type="submit">
                  Submit</button>
          </div>
        </form>
           <hr/>
          <div className='flex justify-between mt-5'>
          <div className='block text-start'>
            <button className='text-[#1F451A] flex rounded items-center cursor-pointer gap-4 font-normal' onClick={() => history('/carts')}>
              <HiOutlineArrowNarrowLeft fontSize={28}/> Back to cart
            </button>
          </div>
          <button 
            className=' text-center mt-5 bg-[#1F451A] text-white cursor-pointer rounded-md p-4 w-42'
            onClick={handlePaymentClick}>
                Go To Payment  
          </button>           
        </div>
        </div>
      )}
       {step === 2 && <PaymentDetails />}
      </div>
    </div>
  );
};

export default BillingDetails;
import React, { useEffect, useState   } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { City, Country, State } from "country-state-city";
import Selector from "../../components/Selector";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateCart } from '../../reducers/auth';

const Shipping = () => {
    /* eslint-disable */
  const history = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { users, cart } = useSelector(state => state.auth)

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

  useEffect(() => {
    if(!users) {
    history("/login")
    }
  }, [history, users]);

  useEffect(() => {
    if(!cart.shippingAddress) {
      toast.info("You've not entered any shipping infomation before")
    }
    setValue('first_name', cart.shippingAddress.firstName);
    setValue('last_name', cart.shippingAddress.lastName);
    setValue('email', cart.shippingAddress.email);
    setValue('phone', cart.shippingAddress.phone);
    setValue('country', cart.shippingAddress.country)
    setValue('postcode', cart.shippingAddress.postCode)
    setValue('addressline1', cart.shippingAddress.addressline1)
    setValue('addressline2', cart.shippingAddress.addressline2)
    setValue('city', cart.shippingAddress.city)
    setValue('state', cart.shippingAddress.state)
  }, []);
  

  const submitHandler = (data) => {
    console.log(data);

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
    toast.success("Shipping Updated Successfully")

    dispatch(updateCart(body))
  };

  return (
    <div>
      <div className='container mx-auto px-10  small my-8 '>
      <div className='flex justify-between items-center gap-1'>
      <h4 className='text-3xl font-bold pb-5'>Shipping</h4>
      </div>
      <p className='text-[#2D2D2D]'>Edit your shipping details</p>


      <form onSubmit={handleSubmit(submitHandler)} className="">
          <div className=''>

            <div className='lg:flex sm:flex-row  justify-between gap-10 pt-10 '>
              <div className='flex flex-col pb-5 w-full'>
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
              <div className='flex flex-col pb-5 w-full'>
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
                            
            <div className='lg:flex sm:flex-row  justify-between gap-10 pt-10'>
              <div className='flex flex-col pb-5 w-full '>
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
                    errors.email ? 'text-red-400 border-red-400' : 'text-gray-700 '}   py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    A valid email is required.
                  </p>
                )}
              </div>
              <div className='flex flex-col pb-5 w-full'>
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
            <div className='lg:flex sm:flex-row  justify-between gap-10 pt-10 '>
            <div className='flex flex-col pb-5 w-full'>
                <p
                  className={` pb-3 text-sm 2 ${
                    errors.country ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Select Country</p>
                  <Selector
                    data={countryData}
                    selected={country}
                    setSelected={setCountry}
                  />
              </div>
              <div className='flex flex-col pb-5 w-full'>
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

            <div className='flex pb-5 flex-col pt-5'>
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
            <div className='flex pb-5 flex-col pt-5'>
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
            <div className='lg:flex sm:flex-row justify-between gap-10 pb-10 pt-10 '>
            <div className='flex pb-5 flex-col w-full'>
                  {city && (
            <div>
              <p className={` pb-3 text-sm 2 ${
                    errors.city ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Town/City :</p>
              <Selector data={cityData} selected={city} setSelected={setCity} />
            </div>
              )}
              </div>
              <div className='flex pb-5 flex-col w-full'>
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
            <hr/>
            <div className='mt-5'>
              <div className='block'>
                <button className='bg-[#1F451A] text-white w-48 rounded text-center cursor-pointer p-3 font-normal' onClick={() => history('/carts')}>
                SAVE SHIPPING INFO
                </button>
              </div>     
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Shipping
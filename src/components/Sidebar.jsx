/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BsToggle2Off, BsToggle2On } from 'react-icons/bs';
import {RiArrowDropDownLine } from 'react-icons/ri';
import { GetBrands } from '../apis/api';

const Sidebar = ({id}) => {
  const [checked, setChecked] = useState(false);
  const history = useNavigate();
  const [openPotent, setOpenPotent] = useState(false);
  const [openPlant, setOpenPlant] = useState(false);
  const [openBrand, setBrandOpen] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [brands, setBrands] = useState([])
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const getBrands =  useCallback(() => {
    setIsLoading(true)
    GetBrands()
    .then((res) => {
      console.log("Brands",res);
      if (res.status === 200) {
          const data = res.data.data
      
          setBrands(data)
          setIsLoading(false)
        }else{
          console.log(res.statusText);
          // enqueueSnackbar(res.statusText, { variant: res.status });
        }
          }).catch((e) => {
          console.log(e);
          });
  },
  []);

  useEffect(() => {
    getBrands();
    },[]);
  
  
  const submitHandler = (data) => {
    console.log(data);
  
  };
  
  const submitPotency = (data) => {
    console.log(data);
  };
  
  function toggle(value){
    return !value;
  }

  console.log("Brands ",brands);
  return (
    <div> 
      <div
        className= "w-72 bg-white accessorySide border border-l-5 flex flex-col border-gray-300  h-full p-5  pb-10 pt-10 relative duration-300"
      >
        <h5 className='pt-5'>SUBCATEGORIES</h5>
        <div className='pt-6'>
          <p className='pb-5 capitalize'>All {id}</p>
          <ul className='text-[#2D2D2D] text-sm  pb-5 cursor-pointer text-start'>
            <li className='pb-2 hover:border-b-2 w-8'>Bongs</li>
            <li className='pb-2 hover:border-b-2 w-8'>Pipes</li>
            <li className='pb-2 hover:border-b-2 w-8'>Smoking Papers</li>
            <li className='pb-2 hover:border-b-2 w-8'>Vapes</li>
          </ul>
          <hr/>
        </div>
        <div className='pt-6'>
          <div className='flex justify-between'>
            <p className='pb-5'>BRANDS</p>
            <button
              className=''
              onClick={() => setBrandOpen(!openBrand)}>
              <RiArrowDropDownLine fontSize={28}/>
            </button>
          </div>
          {openBrand && (
            <form onSubmit={handleSubmit(submitHandler)} className="w-full pt-5 pb-5 space-y-10">
              <div className='flex flex-col justify-between space-y-5 items-start'>
                {brands.map((brand) => {
                      <div className='flex' key={brand.id}>
                      <input
                        checked={checked}
                        onChange={() => setChecked(toggle)}
                        id={brand.slug} 
                        type="checkbox" 
                        name={brand.label} 
                        className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                        aria-labelledby={brand.slug} 
                        aria-describedby={brand.slug}
                      />
                      <label htmlFor={brand.slug} className="text-sm text-[#2D2D2D] ml-2 block">
                        {brand.label}
                      </label>
                    </div>
                })}
                {/* <div className='flex '>
                  <input
                    checked={checked}
                    onChange={() => setChecked(toggle)}
                    id="payment-1" 
                    type="checkbox" 
                    name="paypal" 
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                    aria-labelledby="payment-1" 
                    aria-describedby="payment-1" 
                  />
                  <label htmlFor="payment-1" className="text-sm text-[#2D2D2D] ml-2 block">
            Airvapes
                  </label>
                </div> */}
                {/* <div className='flex '>
                  <input
                    checked={checked}
                    onChange={() => setChecked(toggle)}
                    id="payment-1" 
                    type="checkbox" 
                    name="paypal" 
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                    aria-labelledby="payment-1" 
                    aria-describedby="payment-1" 
                  />
                  <label htmlFor="payment-1" className="text-sm text-[#2D2D2D] ml-2 block">
            Green leevs
                  </label>
                </div>
                <div className='flex '>
                  <input
                    checked={checked}
                    onChange={() => setChecked(toggle)}
                    id="payment-1" 
                    type="checkbox" 
                    name="paypal" 
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                    aria-labelledby="payment-1" 
                    aria-describedby="payment-1" 
                  />
                  <label htmlFor="payment-1" className="text-sm text-[#2D2D2D] ml-2 block">
            Fernway
                  </label>
                </div>
                <div className='flex '>
                  <input
                    checked={checked}
                    onChange={() => setChecked(toggle)}
                    id="payment-1" 
                    type="checkbox" 
                    name="paypal" 
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                    aria-labelledby="payment-1" 
                    aria-describedby="payment-1" 
                  />
                  <label htmlFor="payment-1" className="text-sm text-[#2D2D2D] ml-2 block">
            Grav Labs
                  </label>
                </div> */}
                {/* <button className='text-[#1F451A] text-sm cursor-pointer '>View More </button> */}
              </div>
            </form>
          )}
          <hr/>
        </div>
        <div className='pt-6'>
          <div className='flex justify-between'>
            <p className='pb-5'>PLANT TYPES</p>
            <button
              className=''
              onClick={() => setOpenPlant(!openPlant)}>
              <RiArrowDropDownLine fontSize={28}/>
            </button>
          </div>
          {openPlant && ( 
            <form onSubmit={handleSubmit(submitHandler)} className="w-full pt-5 pb-5 space-y-10">
              <div className='flex flex-col justify-between space-y-5 items-start'>
                <div className='flex '>
                  <input
                    checked={checked}
                    onChange={() => setChecked(toggle)}
                    id="payment-1" 
                    type="checkbox" 
                    name="paypal" 
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                    aria-labelledby="payment-1" 
                    aria-describedby="payment-1" 
                  />
                  <label htmlFor="payment-1" className="text-sm text-[#2D2D2D] ml-2 block">
            Hybrid
                  </label>
                </div>
                <div className='flex '>
                  <input
                    checked={checked}
                    onChange={() => setChecked(toggle)}
                    id="payment-1" 
                    type="checkbox" 
                    name="paypal" 
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                    aria-labelledby="payment-1" 
                    aria-describedby="payment-1" 
                  />
                  <label htmlFor="payment-1" className="text-sm text-[#2D2D2D] ml-2 block">
            Sativa
                  </label>
                </div>
                <div className='flex '>
                  <input
                    checked={checked}
                    onChange={() => setChecked(toggle)}
                    id="payment-1" 
                    type="checkbox" 
                    name="paypal" 
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                    aria-labelledby="payment-1" 
                    aria-describedby="payment-1" 
                  />
                  <label htmlFor="payment-1" className="text-sm text-[#2D2D2D] ml-2 block">
            Indica
                  </label>
                </div>
              </div>
            </form>
          )}
          <hr/>
        </div>
        <div className='pt-6'>
          <div className='flex justify-between'>
            <p className='pb-5'>POTENCY</p>
            <button
              className=''
              onClick={() => setOpenPotent(!openPotent)}>
              <RiArrowDropDownLine fontSize={28}/>
            </button>
          </div>
          {openPotent && (
            <form onSubmit={handleSubmit(submitPotency)} >
              <div>
                <div className='flex flex-col w-full'>
                  <select id="THC"  
                    className={`w-full ${
                      errors.THC ? ' border-red-400' : ''} rounded-xl border p-4 text-gray-500 cursor-pointer`}
                    {...register('THC')}>
                    <option defaultValue="select" value="">THC;  0% - 50%</option>
                    <option value="20% - 50%">20% - 50%</option>
                    <option value="50% - 80%">50% - 80%</option>
                    <option value="80% - 100">80% - 100%</option>
                    <option value="100% - 150%">100% - 150%</option>
                    <option value="150%-200%">150%-200%</option>
                  </select>
                  {errors.THC && (
                    <p className="text-red-500 text-sm mt-2">
                 Select a CBD POTENCY
                    </p>
                  )}
                </div>
                <div className='flex flex-col pt-5 pb-5 w-full'>
                  <select id="CBD"  
                    className={`w-full ${
                      errors.CBD ? ' border-red-400' : ''} rounded-xl border p-4 text-gray-500 cursor-pointer`}
                    {...register('CBD')}>
                    <option defaultValue="select" value="">CBD;    0% - 20%</option>
                    <option value="20% - 50%">20% - 50%</option>
                    <option value="50% - 80%">50% - 80%</option>
                    <option value="80% - 100">80% - 100%</option>
                    <option value="100% - 150%">100% - 150%</option>
                    <option value="150%-200%">150%-200%</option>
                  </select>
                  {errors.CBD && (
                    <p className="text-red-500 text-sm mt-2">
                Select a THC POTENCY
                    </p>
                  )}
                </div>
              </div>
            </form>    
          )}
          <hr/>
        </div>
        <div className='pt-6 '>
          <div className='flex justify-between pt-5 pb-5'>
            <p className='pb-5 text-[#2D2D2D] text-sm'>Out of Stock</p>
            <button onClick={() => setToggleBtn(!toggleBtn)}>
              {toggleBtn ?  
                <BsToggle2On fontSize={28} className="cursor-pointer text-[#1F451A]"/> 
                :
                <BsToggle2Off fontSize={28} className="cursor-pointer text-[#1F451A]"/> 
              }
            </button>    
          </div>
          <hr/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
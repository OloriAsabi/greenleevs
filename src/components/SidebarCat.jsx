import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import {BsFilter} from 'react-icons/bs'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BsToggle2Off, BsToggle2On } from 'react-icons/bs'
import {RiArrowDropDownLine } from 'react-icons/ri'

const SidebarCat = ({ setOpenNav}) => {
    const [checked, setChecked] = useState(false);
    const history =  useNavigate()
    const [openPotent, setOpenPotent] = useState(false);
    const [openPlant, setOpenPlant] = useState(false);
    const [openBrand, setBrandOpen] = useState(false);
    const [openSort, setOpenSort] = useState(false);
    const [toggleBtn, setToggleBtn] = useState(false)
  
      const {
          register,
          handleSubmit,
          formState: { errors }
        } = useForm();
  
        const submitHandler = (data) => {
          console.log(data);
  
        };
  
        const submitPotency = (data) => {
          console.log(data);
        }
        const submitSort = (data) => {
            console.log(data);
          }        
  
        function toggle(value){
          return !value;
        }
  return (
    <div>
    <FaTimes fontSize={28} className="text-black cursor-pointer fixed top-4 right-4 font-light" onClick={() => setOpenNav(false)} />  

    <div className='fixed  w-full top-20 p-10 '>
        <div className='w-full small space-y-8'>
        <div className='flex justify-between'>
             <h5 className='text-xl font-medium text-[#1F451A]'>Filters</h5>
             <button className='cursor-point text-[#1F451A]'>
                <BsFilter fontSize={28}/>
            </button>       
        </div>
        <button
        className='bg-[#1F451A] w-full rounded-md text-center p-3 text-white cursor-pointer '>
            Apply All filters
        </button>
        <button className='text-[#1F451A] pb-5  w-full text-center cursor-pointer'>
            Clear All
        </button>
        <hr/>
     <div className='pt-6'>
    <div className='flex justify-between'>
    <p className='pb-5'>Sort</p>
    <button
    className=''
    onClick={() => setOpenSort(!openSort)}>
        <RiArrowDropDownLine fontSize={28}/>
    </button>
    </div>
    {openSort && ( 
          <form onSubmit={handleSubmit(submitSort)} >
            <div>
            <div className=''>
                  <select id="sort"  
                  className={`w-full ${
                      errors.sort ? " border-red-400" : ""}
                      text-black cursor-pointer rounded-md  hover:scale-x-110 font-normal text-xl border p-4 `}
                  {...register("sort")}>
                      <option 
                      defaultValue="select" value=""> 
                    Sort
                    </option>
                      <option value="Popular">Popular</option>
                      <option value="Brand">Brand</option>
                      <option value="Price: Low to High">Price: Low to High</option>
                      <option value="Price: High to Low">Price: High to Low</option>
                  </select>
                     {errors.sort && (
                    <p className="text-red-500 text-sm mt-2">
                     Select a vaild sort
                    </p>
                  )}
                </div>
            </div>
          </form>    
     )}
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
            Airvapes
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
            </div>
            <button className='text-[#1F451A] text-sm cursor-pointer '>View More </button>
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
                  errors.THC ? " border-red-400" : ""} rounded-xl border p-4 text-gray-500 cursor-pointer`}
              {...register("THC")}>
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
                  errors.CBD ? " border-red-400" : ""} rounded-xl border p-4 text-gray-500 cursor-pointer`}
              {...register("CBD")}>
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
    </div>
  )
}

export default SidebarCat
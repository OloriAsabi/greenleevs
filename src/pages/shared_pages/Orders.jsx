import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { getMenu } from '../../data/data';
import image1 from '../../assests/oils.jpg';
import gummy from '../../assests/gummy.jpg'
import { BiMenu, BiMenuAltRight } from 'react-icons/bi';
import { UserSideBar } from '../../components';

const Orders = () => {
    /* eslint-disable */
  const { menuId } = useParams();
  const menu = getMenu(menuId);
  const [openNav, setOpenNav] = useState(false);

  return (
    <div>
      <div className='container mx-auto small my-8 p-10'>
      <div className='flex justify-between items-center gap-1'>
      <h4 className='text-3xl font-bold pb-5'>Order</h4>
      <button
                className='rounded bg-[#c9e7c5] accessorySide md:hidden hover:scale-x-110  p-3  cursor-pointer'
                onClick={() => setOpenNav(!openNav)}>
                <BiMenu fontSize={28}/>
              </button>
              {!openNav ? (
                <button
                  className='rounded bg-[#c9e7c5] dontShow hover:scale-x-110  p-3  cursor-pointer'
                  onClick={() => setOpenNav(!openNav)}>
                  <BiMenuAltRight className='' fontSize={28}/>
                </button>
              ):(
                <div className={`top-0 right-0 fixed bg-white w-full h-full p-10' ${openNav ? 'translate-x-0' : 'translate-x-full'} ease-in-out duration-300`}>
                  <UserSideBar setOpenNav={setOpenNav}/>
                </div>
              )}
      </div>
     <p className='text-[#2D2D2D]'>Here are the orders you’ve made so far</p>
      <div className='mt-10 flex flex-col  space-y-10 '>
      <div className='flex w-auto p-10 bg-white rounded-lg border h-54 lg:flex-row productDetails justify-between gap-10 border-gray-200 shadow-md'>
      <img src={image1} alt='' className='cartBg '/>
      <div className='flex flex-col gap-10'>
        <p className='text-xl'>Oil Tinctures</p>
        <p className='text-[#1F451A] text-xl bg-[#8aa287] rounded-md p-2'>£50.00</p>
      </div>
      <div  className='items-end text-end flex flex-col gap-10 cursor-pointer'>Qty;1</div>
      </div>
      <div className='flex w-auto p-10 bg-white rounded-lg border h-54 lg:flex-row productDetails justify-between gap-10 border-gray-200 shadow-md'>
      <img src={gummy} alt='' className='cartBg '/>
      <div className='flex flex-col gap-10'>
        <p className='text-xl'>Oil Tinctures</p>
        <p className='text-[#1F451A] text-xl bg-[#8aa287] rounded-md p-2'>£50.00</p>
      </div>
      <div  className='items-end text-end flex flex-col gap-10 cursor-pointer'>Qty;1</div>
      </div>
      </div>

      </div>
    </div>
  )
}

export default Orders
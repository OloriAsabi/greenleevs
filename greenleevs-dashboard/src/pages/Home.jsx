import React from 'react'
import { Header, LineChart, PieChart, Table } from '../components';
import { VscListOrdered } from "react-icons/vsc"
import { HiShoppingCart, HiCreditCard } from "react-icons/hi"
import { BsRecycle, BsTruck } from 'react-icons/bs';
import { IoMdCheckmark } from 'react-icons/io';

const Home = () => {


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Home" title="Dashboard" />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6'>
        <div className='bg-[#ca8a04]  text-white rounded w-full h-auto p-10'>
          <div><VscListOrdered fontSize={48} className="text-center ml-auto mr-auto font-normal" /></div>
          <h1 className=' text-2xl ml-auto mr-auto pt-2 text-center font-normal'>Today's Orders</h1>
          <p className=' text-2xl ml-auto mr-auto pt-2 text-center font-normal'>$0</p>
        </div>

        <div className='bg-[#1F451A] text-white rounded w-full h-auto p-10'>
        <div><HiShoppingCart fontSize={48} className="text-center ml-auto mr-auto font-normal"/></div>
          <h1 className=' text-2xl ml-auto mr-auto pt-2 text-center font-normal'>This Month</h1>
          <p  className=' text-2xl ml-auto mr-auto pt-2 text-center font-normal'>$0</p>
        </div>

        <div  className=' bg-blue-700  text-white rounded w-full h-auto p-10'>
        <div><HiCreditCard fontSize={48} className="text-center ml-auto mr-auto font-normal"/></div>
          <h1 className=' text-2xl ml-auto mr-auto pt-2 text-center font-normal'>Total Orders</h1>
          <p className=' text-2xl ml-auto mr-auto pt-2 text-center font-normal'>$0</p>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 mt-5 lg:grid-cols-2 gap-4  justify-center md:gap-6'>
        <div className='bg-white text-black cursor-pointer flex space-x-5 rounded w-full h-auto p-10'>
          <HiShoppingCart className='rounded-full bg-[#ca8a04] p-3 text-center text-white' fontSize={58}/>
          <div>
          <h3  className='text-2xl '>Total Order</h3>
          <p className='text-2xl font-bold'>304</p>
          </div>
        </div>
        <div className='bg-white text-black cursor-pointer flex space-x-5 rounded w-full h-auto p-10'>
          <BsRecycle  className='rounded-full bg-[#1F451A] text-center text-white p-3' fontSize={58}/>
          <div>
          <h3  className='text-2xl'>Order Pending</h3>
          <p className='text-2xl font-bold'>114</p>
          </div>
        </div>
        <div className='bg-white text-black cursor-pointer flex space-x-5 rounded w-full h-auto p-10'>
          <BsTruck  className='rounded-full bg-[#22b3a960] text-center text-white p-3' fontSize={58}/>
          <div>
          <h3 className='text-2xl'>Order Processing</h3>
          <p className='text-2xl font-bold'>94</p>
          </div>
        </div>
        <div className='bg-white flex cursor-pointer space-x-5 rounded w-full h-auto p-10'>
          <IoMdCheckmark  className='rounded-full bg-blue-700 text-center text-white p-3'  fontSize={58}/>
          <div>
          <h3  className='text-2xl  text-black'>Order Delivered</h3>
          <p className='text-2xl  text-black font-bold'>84</p>
          </div>
        </div>
      </div>

    <div className='mt-10'>
      <div className='grid grid-cols-1 sm:grid-cols-1 mt-5 lg:grid-cols-2 gap-4 md:gap-6'>
          <LineChart/>
        <PieChart />
      </div>
      </div>

      <div className='mt-10'>
        <h1 className='text-2xl font-bold pt-3 pb-3'>Recent Order</h1>
        {/* <Table/> */}
      </div>
      </div>
  )
}

export default Home
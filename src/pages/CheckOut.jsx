import React, { useState } from 'react'
import { BillingDetails, PaymentDetails } from '../components'

import visa from '../assests/Vector (1).png'
import master from '../assests/master.png';
import american from '../assests/american.png'

import image1 from "../assests/oils.jpg"

const CheckOut = () => {

    const [open, setOpen] = useState(false)
    const showPayment = () => {
        if (window.location.pathname === "/checkout") {
          return <PaymentDetails />
        }
      }
      const showBilling = () => {
        if (window.location.pathname === "/checkout") {
          return <BillingDetails />
        }
      }
 
  return (
    <div>
    <div className='container mx-auto w-screen small my-8'>
        <div className='flex justify-between lg:flex-row md:flex-col productDetails gap-20 '>
        <div className='w-full'>
        <div className='flex justify-between gap-10   mt-10 mb-5 leading-8 tracking-widest'>
        <div>
         <button className='cursor-pointer text-[#1F451A]'
         onClick={() => setOpen(!open)}
         >
           <span className='bg-[#1F451A] text-start p-3 rounded-full  text-white'>1</span> Billing Details      
      </button> 
      </div> 
      <div>
      <button className='cursor-pointer text-[#1F451A]'
        onClick={() => setOpen(!open)}>
           <span className='bg-[#1F451A] p-3  mt-10 rounded-full mr-5 text-white'>2</span>Payment Details
      </button> 

       
      </div>
        </div>
        <hr/>
        <div className='w-full'>
            {!open && (
                showBilling()
           )} 
            <div className='w-full'>
            {open && (
            showPayment()
           )} 
           </div>
           </div>
        </div>
        <div className='w-full h-full  bg-[#cde6ca] rounded-lg border flex flex-col  p-10  border-gray-200 shadow-md'>
        <h3 className='text-2xl font-medium pb-5 text-[#2D2D2D]'>ORDER SUMMARY</h3>
        <hr className='text-black'/>

        <div className='flex gap-10 pt-5 pb-5'>
        <img src={image1} alt='' className='cartBg '/>
      <div className='flex flex-col gap-5'>
        <p className='text-xl'>Oil Tinctures</p>
        <p className=''>Quantity - 01</p>
        <p className='text-[#1F451A] text-xl rounded-md p-2'>£50.00</p>
      </div>
        </div>
        <hr  className='text-black'/>

        <div className='pb-5'>
            <p className='pb-6'>Have A Voucher?</p>
            <div className='text-[#2D2D2D] flex justify-between'>Enter Coupon<span className='#1F451A'>Save</span></div>
        </div>
            <hr  className='text-black'/>
        <div className='space-y-10 pt-5 pb-5'>
          <p className='flex justify-between text-slate-500'>Sub-total <span className='text-[#1F451A]'>£20.00</span></p>
          <p className='flex justify-between text-slate-500'>Shipping Charges <span className='text-[#1F451A]'>£10.00</span></p>
          <hr/>
          <p className='flex justify-between text-slate-500'>Total <span className='text-[#1F451A] text-xl'>£30.00</span></p>
        </div>
        </div>
        </div>
    </div>


    <div className='w-screen text-center tracking-widest leading-8 p-20 mt-10 mb-10 shopBg h-full '>
<div className='text-center flex flex-col items-center small justify-center text-white p-5'>
    <h3 className='font-bold text-3xl pb-10'>Not Sure What You’re Looking For?</h3>
    <button className='bg-transpent hover:scale-x-110 border border-white text-white p-3 cursor-pointer rounded-md w-72 font-normal text-2xl'>USE OUR GUIDE</button>
</div>
</div>

<div className='w-screen text-center tracking-widest leading-8 p-20 mt-10 mb-10 bg-white h-full '>
                    <h3 className='text-[#1F451A] text-3xl small font-semibold'>Payment Methods</h3>
                <div className='flex flex-row justify-center small space-x-10 p-10 items-center text-center'>
                    <img src={visa} alt="pay" className='mt-10 w-auto h-auto'/>
                    <img src={american} alt="pay" className='mt-10 w-auto h-auto' />
                    <img src={master} alt="pay" className='mt-10 w-auto h-auto' />
                    <img src={visa} alt='pay' className='mt-10 w-auto h-auto' />
                </div>
       </div>
    </div>
  )
}

export default CheckOut
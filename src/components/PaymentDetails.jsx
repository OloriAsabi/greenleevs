/* eslint-disable */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import paypal from '../assests/PayPal.png';

const PaymentDetails = () => {
  const [checked, setChecked] = useState(false);
  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);

  };

  function toggle(value){
    return !value;
  }
      
  return (
    <div>
      <div className='container mx-auto small'>
        <form onSubmit={handleSubmit(submitHandler)} className="w-full pt-10 space-y-10">
          <div className='flex flex-col justify-between space-y-10 items-center'>
            <div className='w-full h-54  bg-white rounded-lg border flex flex-row p-10 gap-10  border-gray-200 shadow-md'>
              <input
                checked={checked}
                onChange={() => setChecked(toggle)}
                id="payment-1" 
                type="radio" 
                name="paypal" 
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                aria-labelledby="payment-1" 
                aria-describedby="payment-1" 
              />
              <label htmlFor="payment-1" className="text-sm font-medium text-gray-900 ml-2 block">
              PayPal 
              </label>
              <div className='text-justify text-[#1F451A]'>
              You will be redirected to the PayPal website after submitting your order
              </div>
              <img src={paypal} alt="paypal" className='border rounded-sm w-auto h-auto border-gray-500 p-3 '/>
            </div>
            <div className='w-full h-54  bg-white rounded-lg border flex flex-row p-10 gap-10  border-gray-200 shadow-md'>
              <input
                checked={checked}
                onChange={() => setChecked(toggle)}
                id="payment-2" 
                type="radio" 
                name="stripe" 
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                aria-labelledby="payment-2" 
                aria-describedby="payment-2" 
              />
              <label htmlFor="payment-2" className="text-sm font-medium text-gray-900 ml-2 block">
              PayPal 
              </label>
              <div className='text-justify text-[#1F451A]'>
              You will be redirected to the Stripe website after submitting your order
              </div>
              <img src={paypal} alt="paypal" className='border rounded-sm w-auto h-auto border-gray-500 p-3 '/>
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
            >
                    Make Payment  
            </button>           
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentDetails;
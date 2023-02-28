/* eslint-disable */
import React from 'react'
import { useForm } from 'react-hook-form';
import {BsDashLg} from 'react-icons/bs'
import visa from '../assests/Vector (1).png';
import master from '../assests/master.png';
import american from '../assests/american.png';

const ComingSoon = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger
      } = useForm();
      
      const submitHandler = async (data) => {
        console.log('Data', data );
      };
  return (
    <div>
    <div className='container small mx-auto pt-10 w-screen my-8'>
        <div className='flex text-center items-center justify-center'>
            <BsDashLg/>
            Coming Soon
        </div>
        <h3 className='text-center font-bold text-3xl pt-3 pb-3'>Get Notified when the features is available</h3>

        <div>
        <div>
            <form className='flex productDetails p-10 justify-between items-center gap-10' onSubmit={handleSubmit(submitHandler)}>
              <div className='w-full'>           
                <input 
                  name="email" 
                  id="email" 
                  type="text" 
                  className={`block w-full ${
                    errors.email ? 'text-red-400 border-red-400' : 'text-gray-700 '} px-3 py-1 mb-2 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-16 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register('email', { 
                    required: 'Email is Required!!!' ,
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: 'Invalid email address',
                    }})}
                  onKeyUp={() => {
                    trigger('email');
                  }}
                  required={true}
                  placeholder='Email'
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    Email is Required!!!
                  </p>
                )}
              </div>
              <button 
                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-[#1F451A] border border-transparent  hover:bg-[#1F451A] focus:ring
                    focus:ring-purple-300 mt-4 hover:scale-x-110 h-12 w-32" type="submit" to="/">
                     Verify me
              </button>
            </form>
          </div>
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

export default ComingSoon
/* eslint-disable */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import logo from '../assests/green (4) 2.png';
import blog from '../assests/Rectangle 123.png';
import blog1 from '../assests/Rectangle 123 (2).png';
import blog2 from '../assests/Rectangle 123 (1).png';

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setWelcomeInfo } from '../reducers/auth';
import { toast } from 'react-toastify';

const WelcomePage = () => {
  const { dispatch } = useDispatch();

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    age: Yup.date()
      .required()
      .test("age", "You must be 18 or older", function(age) {
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 18);      
        return age <= cutoff;
      })
  });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema)
  });
 
  const submitHandler = async (data) => {
    dispatch(setWelcomeInfo(data));
    localStorage.setItem('welcome', JSON.stringify(data));
    navigate('/');
   toast.success('Welcome to Green leevs');
  };

  return (
    <div className='w-screen '>
      <div className=''>
        <div className='welcomeBg'>
          <img src={logo} alt="logo" className="mr-auto w-72 h-72 ml-auto" />

          <div className='bg-white text-black w-full h-auto pt-10 pb-10'>
            <div className='container mx-auto text-center small flex flex-col space-y-10 justify-center tracking-widest leading-8 items-center'>
              <h1 className='capitalize text-3xl font-bold'>Welcome to green leevs</h1>
              <p className='text-[#2D2D2D] text-xl font-semibold'>Green leevs solely sells only to online retailer and wholesaler of legal recreational cannabis</p>
              <p className='text-[#2D2D2D] text-xl '>You must be 19 or older to access this site as part of our commitment to safe and responsible consumption. Cannabis purchase or attempted purchase by anybody under the age of 19
                <br/>is prohibited, as is buying it for a minor. All sales are subject to the receiver and purchaser's legal age. To read our privacy notification and find out more about how your date of birth is collected, 
                <br/>click here.</p>

              <div className='text-[#2D2D2D] text-xl font-semibold'>To verify that you are at least 19 years old, please enter your age.</div>
            </div>
          </div>

          <div className='container mx-auto flex flex-col justify-center items-center pt-10 pb-10 text-white space-y-10'>
            <form onSubmit={handleSubmit(submitHandler)}>
              <label
                htmlFor='age'
                className={`block pb-3 text-2xl font-bold text-center 2 ${
                  errors.email ? 'text-red-400' : 'text-white '} dark:text-gray-400 col-span-4 sm:col-span-2 `}>
                    Date Of Birth</label>
              <input 
                name="age" 
                id="age" 
                type="date" 
                placeholder='Please verify your date of birth'
                required={true}
                {...register('age', { 
                  required: 'valid age is required',                  
                })}
                onKeyUp={() => {
                  trigger('age');
                }}
                className={`block w-auto ${
                  errors.age ? 'text-red-400 border-red-400' : 'text-gray-700 '} px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-2">
                    A valid age is required
                </p>
              )}

              <button 
                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-[#1F451A] border border-transparent  hover:bg-[#1F451A] focus:ring
              focus:ring-purple-300 mt-4 h-12 w-full" type="submit" to="/">
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>


      <div className='tracking-widest leading-8 pt-20 small container mx-auto text-[#2D2D2D]'>
        <h6 className='font-bold text-2xl '>Explore unrestricted content.</h6>
        <p className='pt-5 text-[#2D2D2D] text-xl'>Continue unverified, concentrating on responsible and deliberate use, to access only unrestricted content.</p>
        <div className='flex xsflex lg:flex-row sm:flex-col xsflex m-10 md:flex-col gap-10'>
          <div className='bg-white rounded-lg border border-gray-200 shadow-md flex flex-col justify-center items-center p-10'>
            <img src={blog} alt="Blog pic" className='rounded-md w-full h-full'/>
            <div className='text-xl font-normal p-5'>Why can’t I find what i’m looking for?</div>
            <button className='bg-[#1F451A] text-white p-3 cursor-pointer hover:scale-x-110 rounded-md w-full font-normal text-xl'>Learn more</button>
          </div>
          <div className='bg-white rounded-lg border border-gray-200 shadow-md flex flex-col justify-center items-center p-10'>
            <img src={blog1} alt="Blog pic" className='rounded-md w-full h-full'/>
            <div className='text-xl font-normal p-5'>Why late delivery?</div>
            <button className='bg-[#1F451A] text-white p-3 cursor-pointer hover:scale-x-110 rounded-md w-full font-normal text-xl'>Learn more</button>
          </div>
          <div className='bg-white rounded-lg border border-gray-200 shadow-md flex flex-col justify-center items-center p-10'>
            <img src={blog2} alt="Blog pic" className='rounded-md w-full h-full'/>
            <div className='text-xl font-normal p-5'>Don’t drive high: it’s not worth the risk</div>
            <button className='bg-[#1F451A] text-white p-3 cursor-pointer rounded-md w-full font-normal hover:scale-x-110 text-xl'>Learn more</button>
          </div>
        </div>
        <div className='flex xsflex lg:flex-row sm:flex-col md:flex-col gap-10 pt-10 justify-start small items-start text-center'>
          <a href='/' className='cursor-pointer'>Website Use Terms</a>
          <a href='/' className='cursor-pointer'>Privacy policy</a>
          <a href='/' className='cursor-pointer'>Purchase Terms and Conditions</a>
          <a href='/' className='cursor-pointer'>Social Media Terms and Conditions</a>
        </div>
        <p className='text-[#2D2D2D] pt-5 pb-5'>Copyright © 2022 Province of British Columbia. All rights reserved.</p>
      </div>
    </div>
  );
};

export default WelcomePage;
import React from 'react'

import visa from '../assests/Vector (1).png';
import master from '../assests/master.png';
import american from '../assests/american.png';
import Bg from "../assests/404.png";
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const history = useNavigate();
  return (
    <div>
        <div className='container small mx-auto w-screen my-8'>
        <div className='w-full h-full pb-5'>
                    <img src={Bg} alt='backgroungImage' className='w-full'/>
        </div>
        <div className='text-center text-[ #2D2D2D] '>
        <h6 className='text-center text-3xl font-normal'>Whoops, that page is Gone</h6>
        <p className='text-center p-5'>The link you clicked maybe broken or the page may have been removed.  but take a chill pill and we are on the go to fix this for you. Kindly navigate back to some of the pages on this screen that is provided below.</p>
        <div className='flex justify-evenly items-center pt-5 '>
        <button
       className='bg-[#1F451A] text-white w-18  rounded text-center cursor-pointer p-3 font-normal' 
       onClick={() => history('/')}>
            Home
        </button>
        <button
          className='border border-[#1F451A] text-[#1F451A] w-18  rounded text-center cursor-pointer p-3 font-normal' 
          onClick={() => history('/shop')}>
            Shop
        </button>
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

export default Error
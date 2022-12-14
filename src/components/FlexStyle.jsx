import React from 'react';
import { BsCart } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
/* eslint-disable */

const FlexStyle = ({ category , isLoading}) => {
  const history = useNavigate();
  return (
    <div>
       {isLoading
          ? 
          <Spinner /> 
          :
      <div className='flex flex-col pl-5 gap-10 pt-10 justify-between w-full'>
        {category.map((cat) => (
          <Link to={`/product/${cat.slug}`} key={cat.product_id}>
            <div className='w-full h-full accessoryBg flex flex-row justify-between items-center gap-10 p-10 space-y-5 hover:shadow-md'>
              <img src={cat.product_image} alt="" className='rounded-md w-80 h-72' />
              <div className='flex flex-row productDetails justify-between gap-x-40'>
                <div className='flex text-start flex-col space-y-5'>
                  <p className='text-xl bg-[#1F451A] rounded-md  gap-2 p-3 w-24 text-white'>{cat.brand?.label}</p>
                  <div className='text-2xl text-start capitalize text-[#1F451A] font-normal'>{cat.label}</div>
                  <div className=''>$ {cat.price}</div>
                </div>
                      
                <div onClick={() => history('/carts')} className='p-5' >
                  <button className='flex justify-center items-center text-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-5 w-full'>
                    <BsCart fontSize={28}/> Add to cart 
                  </button>
                </div>
              </div>
            </div> 
            <hr/>    
          </Link>
        ))}
      </div>
}
    </div>
  );
};

export default FlexStyle;
import React from 'react';
import { BsCart } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { category } from '../data/data';

const FlexStyle = () => {
  const history = useNavigate();
  return (
    <div>
      <div className='flex flex-col pl-5 gap-10 pt-10 justify-between w-full'>
        {category.map((cat) => (
          <Link to={`/product/${cat.id}`} key={cat.id}>
            <div className='w-full h-full accessoryBg flex flex-row justify-between gap-10 p-10 space-y-5 hover:shadow-md'>
              <img src={cat.img} alt="" className='rounded-md w-80 h-72' />
              <div className='flex flex-row productDetails justify-between gap-x-40'>
                <div className='flex text-start flex-col space-y-5 '>
                  <p className='text-14 text-[#1F451A]'>Green leevs</p>
                  <div className='text-2xl text-start capitalize text-[#1F451A] font-normal'>{cat.title}</div>
                  <div className=''>$75.30</div>
                </div>
                      
                <div onClick={() => history('/carts')} className='' >
                  <button className='flex justify-center items-center text-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-2 w-24'>
                    <BsCart fontSize={28}/> Add to cart 
                  </button>
                </div>
              </div>
            </div> 
            <hr/>    
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FlexStyle;
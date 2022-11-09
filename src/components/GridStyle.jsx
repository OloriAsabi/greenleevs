import React from 'react';
import { BsCart } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { category } from '../data/data';

const GridStyle = () => {
  const history = useNavigate();
  return (
    <div>
      <div className='grid lg:grid-cols-3  md:grid-cols-2 pl-5 sm:grid-cols-2 gap-10 pt-10 justify-between items-center'>
        {category.map((cat) => (
          <Link to={`/product/${cat.id}`} key={cat.id}>
            <div className='w-80 h-auto bg-white rounded-lg border flex flex-col justify-between p-5 space-y-5 hover:shadow-md'>
              <img src={cat.img} alt="" className='rounded-md w-auto h-auto' />
              <p className='text-14 text-[#1F451A]'>Green leevs</p>
              <div className='text-2xl text-start capitalize text-[#1F451A] font-normal'>{cat.title}</div>
              <div className=''>$75.30</div>
              <div onClick={() => history('/carts')} className='' >
                <button className='flex justify-center items-center text-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-3 w-full'>
                  <BsCart fontSize={28}/> Add to cart
                </button>
              </div>
            </div>     
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GridStyle;
/* eslint-disable */
import React, { useState } from 'react';
import { BiMenu, BiMenuAltRight, BiSortAlt2 } from 'react-icons/bi';
import { BsCart, BsGrid } from 'react-icons/bs';
import { category } from '../data/data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import visa from '../assests/Vector (1).png';
import master from '../assests/master.png';
import american from '../assests/american.png';

import { Mousewheel } from 'swiper';
import { FlexStyle, GridStyle, Sidebar, SidebarCat } from '../components';
import { useForm } from 'react-hook-form';

const Accessories = () => {
  const [open, setOpen] = useState(false);
  // const [openSort, setOpenSort] = useState(false)
  const [openNav, setOpenNav] = useState(false);
  // const [isOpen, setIsOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All');

  const showGrid = () => {
    if (window.location.pathname === '/shop/accessories') {
      return <GridStyle />;
    }
  };
  const showFlex = () => {
    if (window.location.pathname === '/shop/accessories') {
      return <FlexStyle />;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitSort = (data) => {
    console.log(data);
  };

  
  const handleWorkFilter = (item) => {
    setActiveFilter(item);

    setTimeout(() => {

      if (item === 'All Accessories') {
        // setFilterWork(works);
      } else {
        // setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };
  return (      
  
    <div>
      <div className='w-screen flex h-full '>
        <Sidebar />
        <div className="h-full flex-1 small p-7">   
          <div className="p-10 flex dontShow  flex-wrap justify-between">
            {['All Accessories', 'Bongs', 'Pipes', 'Smoking Papers', 'Vapes'].map((item, index) => (
              <div
                key={index}
                onClick={() => handleWorkFilter(item)}
                className={`cursor-pointer bg-[#b3d3af] text-[#1F451A]  p-4 rounded-full
            ${activeFilter === item ? 'text-[#1F451A] bg-[#577952]' : ''}`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className='flex justify-between pt-10 pb-6'>
            <h4 className='text-2xl font-medium pb-5'>ALL ACCESSORIES</h4>
            <div className='flex justify-between items-center gap-10'>
              <div>
                <form onSubmit={handleSubmit(submitSort)} >
                  <div>
                    <div className=''>
                      <select id="sort"  
                        className={`w-24 ${
                          errors.sort ? ' border-red-400' : ''} bg-[#1F451A]
                  text-white cursor-pointer rounded-md accessorySide hover:scale-x-110 font-normal text-xl border p-4 `}
                        {...register('sort')}>
                        <option 
                          defaultValue="select" value=""> 
                            Sort
                        </option>
                        <option value="Popular">Popular</option>
                        <option value="Brand">Brand</option>
                        <option value="Price: Low to High">Price: Low to High</option>
                        <option value="Price: High to Low">Price: High to Low</option>
                      </select>
                      {errors.sort && (
                        <p className="text-red-500 text-sm mt-2">
                 Select a vaild sort
                        </p>
                      )}
                    </div>
                  </div>
                </form>    
              </div>
              <button
                className='rounded bg-[#c9e7c5]  hover:scale-x-110  p-3  cursor-pointer'
                onClick={() => setOpen(!open)}>
                <BsGrid fontSize={28}/>
              </button>
              <button
                className='rounded bg-[#c9e7c5] accessorySide  hover:scale-x-110  p-3  cursor-pointer'
                onClick={() => setOpen(!open)}>
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
                  <SidebarCat setOpenNav={setOpenNav}/>
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className='w-full'>
            {!open && (
              showGrid()
            )} 
            <div className='w-full'>
              {open && (
                showFlex()
              )} 
            </div>
          </div>
        </div>
      </div>
      <div className='pt-10 accessorySide  small pl-10 pr-`10 '>
        <h1 className='text-3xl font-bold mb-10 text-[#2D2D2D] text-start shopText'>Categories</h1>
        <div className='p-10'>
          <Swiper
            mousewheel={true}
            spaceBetween={50}
            breakpoints={{
              640:{
                width: 640,
                slidesPerView: 2
              },
              768:{
                width: 768,
                slidesPerView: 2
              },
              //   1400:{
              //       width: 1400,
              //       slidesPerView: 3
              //   },
            }}
            modules={Mousewheel}
            className="mySwiper">
            {category.map(cat => (
              <SwiperSlide key={cat.id}>
                <Link to={`/shop/${cat.title}`} key={cat.id}>
                  <div className='w-full h-full  bg-white rounded-lg border flex flex-col justify-between p-5 space-y-10 hover:shadow-md'>
                    <img src={cat.img} alt="" className='rounded-md w-auto h-fauto' />
                    <div className='text-2xl text-start capitalize text-[#1F451A] font-normal'>{cat.title}</div>
                    <button className='bg-[#1F451A] text-white p-3 cursor-pointer rounded-md w-full hover:scale-x-110 text-xl'>Explore</button>
                  </div>
                </Link>               
              </SwiperSlide>     
            )) }
          </Swiper>
        </div>
      </div>
      <div className='pt-10 dontShow small'>
        <div className='conatiner mx-auto '>
          <h1 className='text-3xl font-bold mb-10 text-[#2D2D2D] text-start shopText'>Shop By Categories</h1>
          <div className='flex flex-col justify-between items-center'>
            {category.map(cat => (
              <Link to={'/shop/accessories'} key={cat.id}>
                <div className='flex flex-col justify-betwe items-center'>
                  <div className='text-2xl p-3 cursor-pointer rounded-md w-72 mb-10 hover:scale-x-110 border border-[#1F451A] capitalize text-[#1F451A] font-normal'>{cat.title}</div>
                </div>
              </Link>               
            )) }
          </div>
        </div>
      </div>
     
      <div className='w-screen text-center tracking-widest leading-8 p-20 mt-10 mb-10 bg-white h-full '>
        <h3 className='text-[#1F451A] small text-3xl font-semibold'>Payment Methods</h3>
        <div className='flex flex-row justify-center space-x-10 small p-10 items-center text-center'>
          <img src={visa} alt="pay" className='mt-10 w-auto h-auto'/>
          <img src={american} alt="pay" className='mt-10 w-auto h-auto' />
          <img src={master} alt="pay" className='mt-10 w-auto h-auto' />
          <img src={visa} alt='pay' className='mt-10 w-auto h-auto' />
        </div>
      </div>
    </div>
  );
};

export default Accessories;
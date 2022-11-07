import React from 'react'
import { category, edibles, extracts } from '../data/data';
import { Swiper, SwiperSlide } from "swiper/react";
import {BsCart} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'



import { Mousewheel } from "swiper";
import visa from '../assests/Vector (1).png'
import master from '../assests/master.png';
import american from '../assests/american.png'

import "swiper/css";


const Shop = () => {
    const history =  useNavigate();
  return (
    <div>
        <div className='small w-screen container mx-auto my-8'>
            <div>
            <h1 className='text-3xl font-bold mb-10 text-[#2D2D2D] pt-10 text-start shopText'>Categories</h1>
            <div className='p-10'>
            <div className='grid lg:grid-cols-3  md:grid-cols-2 pl-5 sm:grid-cols-2 gap-10 pt-10 justify-between items-center'>
                {category.map((cat) => (
                      <div key={cat.id} className='w-80 h-auto  bg-white ro unded-lg borderflex flex-col justify-between p-5 space-y-5 hover:shadow-md'>
                          <img src={cat.img} alt="" className='rounded-md w-auto h-auto' />
                          <div className='text-2xl text-start capitalize text-[#1F451A] font-normal'>{cat.title}</div>
                          <div onClick={() => history('/shop/accessories')} className='' >
                              <button className='text-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-3 w-full'>
                              Explore
                              </button>
                          </div>
                      </div>     
                ))}
      </div>
            </div>
            </div>

            <div className='pt-10'>
            <h1 className=' text-3xl font-bold mb-10 text-[#2D2D2D] shopText'>Popular</h1>
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
                    <Link to={`/product/${cat.id}`}>
                    <div className='w-full h-full bg-white rounded-lg border flex flex-col justify-between p-5 space-y-10 hover:shadow-md'>
                        <img src={cat.img} alt="" className='rounded-md w-auto h-auto' />
                        <div className='text-2xl text-start text-[#1F451A] font-normal'>{cat.title}</div>
                        {/* <button className='bg-[#1F451A] text-white p-3 cursor-pointer rounded-md text-xl'> <BsCart fontSize={28}/> Add to cart</button> */}
                        <a  href='/carts' className='' >
                            <button className='flex justify-center items-center text-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-3 w-full'>
                            <BsCart fontSize={28}/> Add to cart
                            </button>
                        </a>
                    </div>     
                    </Link>           
                     </SwiperSlide>     
                )) }
                </Swiper>
            </div>
            </div>


            <div className='pt-10'>
            <div className='flex items-center xsflex justify-between'>
            <div className='font-bold text-3xl  text-black'>Popular Edibles</div>
            <div className='font-bold text-2xl cursor-pointer text-[#1F451A]'>See All Edibles</div>
            </div>
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
                {edibles.map(cat => (
                     <SwiperSlide key={cat.id}>
                    <div className='w-full h-full bg-white rounded-lg border flex flex-col justify-between p-5 space-y-10 hover:shadow-md'>
                        <img src={cat.img} alt="" className='rounded-md w-full h-9/12 object-cover' />
                        <div className='text-2xl text-start text-[#1F451A] font-normal'>{cat.title}</div>
                        <a  href='/carts' className='' >
                            <button className='flex text-center items-center justify-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-3 w-full'>
                            <BsCart fontSize={28}/> Add to cart
                            </button>
                        </a>
                    </div>                
                     </SwiperSlide>     
                )) }
                </Swiper>
            </div>
            </div>

            <div className='pt-10'>
            <div className='flex items-center xsflex justify-between'>
            <div className='font-bold text-3xl  text-black'>Popular Extracts</div>
            <div className='font-bold text-2xl cursor-pointer text-[#1F451A]'>See All Extracts</div>
            </div>
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
                {extracts.map(cat => (
                     <SwiperSlide key={cat.id}>
                    <div className='w-full h-full bg-white rounded-lg border flex flex-col justify-between p-5 space-y-10 hover:shadow-md'>
                        <img src={cat.img} alt="" className='rounded-md w-auto h-auto object-cover' />
                        <div className='text-2xl text-start text-[#1F451A] font-normal'>{cat.title}</div>
                        <a  href='/carts' className=' text-center ' >
                            <button className='flex justify-center text-center items-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-3 w-full'>
                            <BsCart fontSize={28}/> Add to cart
                            </button>
                        </a>
                    </div>                
                     </SwiperSlide>     
                )) }
                </Swiper>
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

export default Shop
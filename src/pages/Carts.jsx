/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {AiOutlineLeftCircle, AiOutlineDelete} from 'react-icons/ai';
import image1 from '../assests/oils.jpg';
import {IoIosRemoveCircleOutline, IoIosAddCircleOutline} from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import {BsCart} from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { category, extracts } from '../data/data';

import { Mousewheel } from 'swiper';
import visa from '../assests/Vector (1).png';
import master from '../assests/master.png';
import american from '../assests/american.png';
import { useStateContext } from '../contexts/ContextProvider';
import { GetCart } from '../apis/api';

const Carts = () => {
  const history = useNavigate();
  const [itemCount, setItemCount] = useState(1);
  const [carts, setCarts] = useState([]);


  const { dispatch, state } = useStateContext();
  const { user } = state;
  // console.log(user);

  useEffect(() => {
    GetCart(user.id)
    .then((response) => {
    console.log(response);
    }).catch((e) => {
    console.log(e);
    });
  },[]);

  return (
    <div>
      <div className='container mx-auto w-screen small my-8'>
        <div className='block text-start mt-10'>
          <button className='text-[#1F451A] flex rounded items-center cursor-pointer gap-4 text-xl' onClick={() => history('/shop')}>
            <AiOutlineLeftCircle fontSize={28}/> Back to shop
          </button>
        </div>

        <div className='flex lg:flex-row md:flex-col justify-between pb-10  pt-10 gap-10 productDetails'>
          <div className='w-full'>
            <h4 className='text-3xl font-bold pb-5'>Carts</h4>
            <div className='w-full h-54  bg-white rounded-lg border flex flex-col p-10  border-gray-200 shadow-md'>
              <div className='flex lg:flex-row productDetails justify-between gap-10'>
                <img src={image1} alt='' className='cartBg '/>
                <div className='flex flex-col gap-10'>
                  <p className='text-xl'>Oil Tinctures</p>
                  <p className='text-[#1F451A] text-xl bg-[#8aa287] rounded-md p-2'>£50.00</p>
                </div>
                <div className='items-end text-end flex flex-col gap-10 cursor-pointer'>
                  <AiOutlineDelete fontSize={38} className="text-red-500"/>
                  <div className='flex items-center justify-between gap-10  cursor-pointer'>
                    <button
                      onClick={() => {
                        setItemCount(Math.max(itemCount - 1, 0));
                      }}
                      className="text-[#2D2D2D]">
                      {' '}
                      <IoIosRemoveCircleOutline fontSize={38} className='text-[#2D2D2D]'/>
                    </button>
                    <div className='text-xl'>{itemCount}</div>
                    <button
                      onClick={() => {
                        setItemCount(itemCount + 1);
                      }}
                      className="text-[#2D2D2D]">
                      {' '}
                      <IoIosAddCircleOutline fontSize={38} className='text-[#2D2D2D]'/>
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-full bg-white rounded-lg border flex flex-col  p-10  border-gray-200 shadow-md'>
            <h3 className='text-2xl font-medium pb-5'>ORDER SUMMARY</h3>

            <div className='space-y-10 pt-5 pb-5'>
              <p className='flex justify-between text-slate-500'>Sub-total <span className='text-[#1F451A]'>£20.00</span></p>
              <p className='flex justify-between text-slate-500'>Shipping Charges <span className='text-[#1F451A]'>£10.00</span></p>
              <hr/>
              <p className='flex justify-between text-slate-500'>Total <span className='text-[#1F451A] text-xl'>£30.00</span></p>
            </div>
            <a href='/checkout' className='mt-5' >
              <button className=' text-center bg-[#1F451A] text-white cursor-pointer rounded-md p-4 w-full'>
                            Proceed To Checkout
              </button>
            </a>
          </div>
        </div>

        <div className='pt-10'>
          <h1 className=' text-3xl font-bold mb-10 text-[#2D2D2D] shopText'>Related Products</h1>
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
                  <div className='w-full h-full bg-white rounded-lg border flex flex-col justify-between p-5 space-y-10 hover:shadow-md'>
                    <img src={cat.img} alt="" className='rounded-md w-auto h-auto' />
                    <div className='text-2xl text-start text-[#1F451A] font-normal'>{cat.title}</div>
                    {/* <button className='bg-[#1F451A] text-white p-3 cursor-pointer rounded-md text-xl'> <BsCart fontSize={28}/> Add to cart</button> */}
                    <a href='/carts' className='' >
                      <button className='flex justify-center items-center text-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-3 w-full'>
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
                  <div className='w-full h-full bg-white rounded-lg border flex flex-col justify-between p-5 space-y-10 hover:shadow-md'>
                    <img src={cat.img} alt="" className='rounded-md w-auto h-auto' />
                    <div className='text-2xl text-start text-[#1F451A] font-normal'>{cat.title}</div>
                    {/* <button className='bg-[#1F451A] text-white p-3 cursor-pointer rounded-md text-xl'> <BsCart fontSize={28}/> Add to cart</button> */}
                    <a href='/carts' className='' >
                      <button className='flex justify-center items-center text-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-3 w-full'>
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

export default Carts;
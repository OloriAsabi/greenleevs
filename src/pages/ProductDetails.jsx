import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { category, extracts } from '../data/data';
import {AiOutlineLeftCircle} from 'react-icons/ai';
import image1 from '../assests/oils.jpg';
import product4 from '../assests/weed.jpeg';
import tin from '../assests/tinctures.jpg';
import weed from '../assests/Rectangle 20 (4).jpg';
import {IoIosRemoveCircleOutline, IoIosAddCircleOutline} from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import {BsCart} from 'react-icons/bs';
// import { Link } from 'react-router-dom'
import visa from '../assests/Vector (1).png';
import master from '../assests/master.png';
import american from '../assests/american.png';


import { Mousewheel } from 'swiper';

/* eslint-disable */
const ProductDetails = () => {
  const { id } = useParams();
  // const [product, setProduct] = useState({})
  const history = useNavigate();
  const [itemCount, setItemCount] = useState(1);


  useEffect(() => {    
    // export function getTopic(topicId) {
    //     return topics.find(({ id }) => id === topicId);
    //   }
    // setProduct(item)
    // item.id
  }, [id]);

  return (
    <div>
      <div className='container small mx-auto w-screen my-8'>
        <div className='block text-start mt-10'>
          <button className='text-[#1F451A] flex rounded items-center cursor-pointer gap-4 text-xl' onClick={() => history('/')}>
            <AiOutlineLeftCircle fontSize={28}/> Back 
          </button>
        </div>
        <div className='flex lg:flex-row productDetails md:flex-col justify-between mt-10 mb-10 gap-10'>
          <div className='w-full'>
            <img src={image1} alt='' className='productDetailsImg1'/>
            <div className='flex pt-5 w-full justify-start gap-10 items-center'>
              <img src={tin} alt="" className='productDetailsImg rounded-md' />
              <img src={product4} alt="" className='productDetailsImg rounded-md' />
              <img src={weed} alt="" className='productDetailsImg rounded-md' />
            </div>
          </div>
          <div className='flex flex-col text-start space-y-10  w-full items-start'>
            <h3 className='text-black text-3xl'>OIL TINCTURES</h3>
            <p className='text-[#1F451A] text-2xl '>£50.00</p>
            <div className='text-justify text-[#2D2D2D] text-xl font-light w-8/12'>Tinctures is a sativa-leaning hybrid that excels in both potency and aroma: its caramel, citrus, and mango notes are almost as recognizable as its name. This fruit-forward strain contains the terpenes Alpha Pinene, Caryophylenne and Myrcene.</div>
            <div>
              <ul className='space-y-5'>
                <li className='flex justify-between text-justify gap-20 items-center'>
                  <span className='text-black text-2xl font-normal'>Produced in; </span>
                             Ontari
                </li>
                <li className='flex justify-between text-justify gap-20 items-center'>
                  <span className='text-black text-2xl font-normal'>Brand; </span>
                        Good Supply
                </li>
                <li className='flex justify-between text-justify items-center'>
                  <span className='text-black text-2xl font-normal'>Producer; </span>
                        Aphria Inc.
                </li>
                <li className='flex justify-between text-justify gap-20 items-center'>
                  <span className='text-black text-2xl font-normal'>Plant Type; </span>
                        Hybrid
                </li>
                <li className='flex justify-between text-justify gap-20 items-center '>
                  <span className='text-black text-2xl font-normal'>THC; </span>
                  <div className='flex flex-col'>
                    <span> 5.70 - 30.00 mg </span>       
                    <span> 0.20 - 1.05 mg/g</span>   
                  </div>
                </li>
                <li className='flex justify-between  gap-20 items-center'>
                  <span className='text-black text-2xl font-normal'>CBD;</span>
                  <div className='flex flex-col'>
                    <span> 255.00 - 345.00 mg</span>       
                    <span> 8.95 - 12.00 mg/g</span>   
                  </div>
                </li>
                <li className='flex justify-between text-justify gap-20 items-center'>
                  <span className='text-black text-2xl font-normal'>Consumption;</span>
                        Inhalation
                </li>
              </ul>
            </div>
            <div className='flex lg:flex-row productDetails  gap-10  justify-between'>
              <div className='flex items-center justify-between gap-10  cursor-pointer'>
                <button
                  onClick={() => {
                    setItemCount(Math.max(itemCount - 1, 0));
                  }}>
                  {' '}
                  <IoIosRemoveCircleOutline fontSize={38}/>
                </button>
                <div className='text-xl'>{itemCount}</div>
                <button
                  onClick={() => {
                    setItemCount(itemCount + 1);
                  }}>
                  {' '}
                  <IoIosAddCircleOutline fontSize={38}/>
                </button>

              </div>
              <a href='/carts' className='' >
                <button className='flex justify-center items-center text-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-3 w-full'>
                  <BsCart fontSize={28}/> Add to cart
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className='pt-10'>
          <h1 className=' text-3xl font-normal mb-10 text-[#2D2D2D] shopText'>Related Products</h1>
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
          <div className='text-start'>
            <div className='font-normal text-3xl  text-black'>Recently Viewed</div>
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
                    <a href='/carts' className=' text-center ' >
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
        <h3 className='text-[#1F451A] small text-3xl font-semibold'>Payment Methods</h3>
        <div className='flex flex-row justify-center small space-x-10 p-10 items-center text-center'>
          <img src={visa} alt="pay" className='mt-10 w-auto h-auto'/>
          <img src={american} alt="pay" className='mt-10 w-auto h-auto' />
          <img src={master} alt="pay" className='mt-10 w-auto h-auto' />
          <img src={visa} alt='pay' className='mt-10 w-auto h-auto' />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
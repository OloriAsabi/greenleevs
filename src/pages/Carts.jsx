/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {AiOutlineLeftCircle, AiOutlineDelete} from 'react-icons/ai';
import image1 from '../assests/oils.jpg';
import {IoIosRemoveCircleOutline, IoIosAddCircleOutline} from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import {BsCart} from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { Mousewheel } from 'swiper';
import visa from '../assests/Vector (1).png';
import master from '../assests/master.png';
import american from '../assests/american.png';
import { useStateContext } from '../contexts/ContextProvider';
import { GetCart, GetPopularProducts, GetRecentlyViewed, UpdateCart } from '../apis/api';
import { Spinner } from '../components';

const Carts = () => {
  const history = useNavigate();
  const [itemCount, setItemCount] = useState(1);
  const [carts, setCarts] = useState([]);
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [recent, setRecent] = useState([]);

  const { dispatch, state } = useStateContext();
  const { cart: {cartItems} } = state;
  const getPopularProducts = useCallback(() => {
    setIsLoading(true)
    GetPopularProducts()
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        const data = res.data.data
    
        setPopular(data)
        setIsLoading(false)
    }else{
      enqueueSnackbar(res.data.message, { variant: res.data.status });
    }
    })
  },[]);

  const getRecentlyView = useCallback(() => {
    setIsLoading(true)
    GetRecentlyViewed()
    .then((res) => {
      console.log("Recently Viewed Products", res);
      if (res.status === 200) {
        const data = res.data.data
    
        setRecent(data)
        setIsLoading(false)
    }else{
      enqueueSnackbar(res.data.message, { variant: res.data.status });
    };
    }).catch((e) => {
      console.log(e);
      });
  },[]);

  useEffect(() => {
    GetCart()
    .then((res) => {
    console.log("Get Cart Fot", res);
    if (res.status === 200) {
      const data = res.data.data
  
      setCarts(data)
      setIsLoading(false)
      }else{
        enqueueSnackbar(res.data.message, { variant: res.data.status });
      };
    }).catch((e) => {
    console.log(e);
    });
    getPopularProducts();
    getRecentlyView();
  },[]);

  const updateCartHandler = async(item, quantity) => {
    if (item.product.countinStock < quantity) {
      enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
      return;
    }
    const body = {
      product_id: item.product_id,
      quantity: quantity,
    }
    UpdateCart(body)
      .then((res) => {
        console.log(res);
        dispatch({
          type: 'CART_ADD_ITEM',
          payload: {
            _key: item.product_id,
            name: item.label,
            countInStock: item.countinStock,
            slug: item.slug,
            price: item.price,
            image: item.product_image,
            quantity,
          },
        });
        if(res.data.status === 'success'){
           enqueueSnackbar(` Cart Updated`, {
          variant: res.status, 
        });
              // history('/carts')
        }else{
          enqueueSnackbar(res.data.message, { variant: res.data.status });
        }
      })
    dispatch({
      type: 'CART_ADD_ITEM',
      // payload: {
      //   _key: item._key,
      //   name: item.name,
      //   countInStock: item.countInStock,
      //   slug: item.slug,
      //   price: item.price,
      //   image: item.image,
      //   quantity,
      // },
    });
    enqueueSnackbar(`${item.product.label} updated in the cart`, {
      variant: res.status, 
    });
  }

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
            {cartItems.length === 0 ?(
              <div>
                  <h4>
                    Cart is empty.{' '}
                    <a href="/shop" passHref>
                    <p>Go shopping</p>
                    </a>
                </h4>
              </div>
            ) : (
              <div>
              {carts.map((cat) => (
                <div className='flex lg:flex-row productDetails justify-between gap-10' key={cat.product_id}>
                <img src={cat.product.product_image} alt='' className='cartBg '/>
                <div className='flex flex-col gap-10'>
                  <p className='text-xl'>{cat.product.label}</p>
                  <p className='text-[#1F451A] text-xl bg-[#8aa287] rounded-md p-2'>{cat.product.price}</p>
                </div>
                <div className='items-end text-end flex flex-col gap-10 cursor-pointer'>
                  <AiOutlineDelete fontSize={38} className="text-red-500"/>
                  <div className='flex items-center justify-between gap-10  cursor-pointer'>
                    {/* <button
                      onClick={() => {
                        updateCartHandler(Math.max(cat.quantity - 1, 0));
                      }}
                      className="text-[#2D2D2D]">
                      {' '}
                      <IoIosRemoveCircleOutline fontSize={38} className='text-[#2D2D2D]'/>
                    </button>
                    <div className='text-xl'>{cat.quantity}</div>
                    <button
                      onClick={() => {
                        updateCartHandler(cat.quantity + 1);
                      }}
                      className="text-[#2D2D2D]">
                      {' '}
                      <IoIosAddCircleOutline fontSize={38} className='text-[#2D2D2D]'/>
                    </button> */}
                       <select
                                  value={cat.quantity}
                                  onChange={(e) =>
                                  updateCartHandler(cat, e.target.value)
                                                    }
                                                    >
                                 {[...Array(cat.product.quantity).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                   </option>
                             ))}
                       </select>
                  </div>
                </div>
              </div>
              ))}
              <button className=' text-center bg-[#1F451A] text-white mt-8 cursor-pointer rounded-md p-4 w-full'>
                Delete
              </button>
              </div>
            )}
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
          <div className='text-start'>
            <div className='font-normal text-3xl  text-black'>Recently Viewed</div>
          </div>
          <div className='p-10'>
          {isLoading
                  ? 
                  <Spinner /> 
                  :
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
              {recent.map(r => (
                <SwiperSlide key={r.product_id}>
                  <div className='w-full h-full bg-white rounded-lg border flex flex-col justify-between p-5 space-y-10 hover:shadow-md'>
                    <img src={r.product_image} alt="" className='rounded-md w-auto h-auto object-cover' />
                    <div className='text-2xl text-start text-[#1F451A] font-normal'>{r.label}</div>
                    <p className='text-center ' >
                      <button className='flex justify-center text-center items-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-3 w-full'
                      onClick={() => addToCartHandler()}>
                        <BsCart fontSize={28}/> Add to cart
                      </button>
                    </p>
                  </div>                
                </SwiperSlide>     
              )) }
            </Swiper>
}
          </div>
        </div>


        <div className='pt-10'>
          <h1 className=' text-3xl font-bold mb-10 text-[#2D2D2D] shopText'>Popular</h1>
          <div className='p-10'>
          {isLoading
                  ? 
                  <Spinner /> 
                 :
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
              {popular.map(pop => (
                <SwiperSlide key={pop.product_id}>
                  <Link to={`/product/${pop.slug}`}>
                    <div className='w-full h-full bg-white rounded-lg border flex flex-col justify-between p-5 space-y-10 hover:shadow-md'>
                      <img src={pop.product_image} alt="" className='rounded-md w-auto h-auto' />
                      <div className='text-2xl text-start text-[#1F451A] font-normal'>{pop.label}</div>
                      <div onClick={() => history('/carts')} className='' >
                        <button className='flex justify-center items-center text-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-3 w-full'
                          onClick={() => addToCartHandler()}>
                          <BsCart fontSize={28}/> Add to cart
                        </button>
                      </div>
                    </div>     
                  </Link>           
                </SwiperSlide>     
              )) }
            </Swiper>
}
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
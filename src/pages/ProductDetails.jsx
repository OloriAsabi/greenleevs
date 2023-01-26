import React, { useEffect, useState,  useCallback  } from 'react';
/* eslint-disable */
import { useNavigate, useParams } from 'react-router-dom';
import { category, extracts } from '../data/data';
import {AiOutlineLeftCircle} from 'react-icons/ai';
import {IoIosRemoveCircleOutline, IoIosAddCircleOutline} from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import {BsCart} from 'react-icons/bs';
// import { Link } from 'react-router-dom'
import visa from '../assests/Vector (1).png';
import master from '../assests/master.png';
import american from '../assests/american.png';
import { useSnackbar } from 'notistack';

import { Mousewheel } from 'swiper';
import { GetProductId, GetRecentlyViewed, GetRelatedProducts, PostCart } from '../apis/api';
import { Spinner } from '../components';
import { useStateContext } from '../contexts/ContextProvider';


const ProductDetails = () => {
  const { id } = useParams();
  const { state, dispatch } = useStateContext();
  const { user, cart } = state;
  const history = useNavigate();

  useEffect(() => {
    if(!user) {
      history("/login")
    }
  }, [history, user]);

  const { enqueueSnackbar } = useSnackbar();
  
  const [product, setProduct] = useState({});
  const [recent, setRecent] = useState([]);
  const [related, setRelated] = useState([]);
  const [itemCount, setItemCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false)

  const getProductById =  useCallback(() => {
    setIsLoading(true)
    GetProductId(id)
    .then((res) => {
      console.log("Product By id",res);
      if (res.status === 200) {
          const data = res.data.data
      
          setProduct(data)
          setIsLoading(false)
      }else{
        console.log(res.statusText);
        enqueueSnackbar(res.statusText, { variant: res.status });
      }
          }).catch((e) => {
          console.log(e);
          });
  },
  [id]);

  const getRelatedProducts = useCallback(() => {
    setIsLoading(true)
    GetRelatedProducts(id)
    .then((res) => {
      console.log("Related Products",res);
      const data = res.data.data
      setRelated(data)
      setIsLoading(false)
    }).catch((e) => {
      console.log(e);
      });
  },[id]);

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
      console.log(res.statusText);
      enqueueSnackbar(res.statusText, { variant: res.status });
    };
    }).catch((e) => {
      console.log(e);
      });
  },[id]);

  useEffect(() => {  
   getProductById();
   getRelatedProducts();
   getRecentlyView();
  }, [id]);

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product.product_id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    // const id = user.id
        // if (product.countInStock < quantity) {
    //   enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
    //   return;
    // }
    const body = {
      product_id: product.product_id,
      quantity: quantity,
    }
    PostCart( body)
    .then((res) => {
      console.log(res);
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: {
          _key: product.product_id,
          name: product.label,
          countInStock: product.countInStock,
          slug: product.slug,
          price: product.price,
          image: product.product_image,
          quantity,
        },
      });
      // res.status
      // enqueueSnackbar(`${product.label} added to the cart`, {
      //   variant: res.status, 
      // });
      history('/carts')
    })
  }

  return (
    <div>
      <div className='container small mx-auto w-screen my-8'>
        <div className='block text-start mt-10'>
          <button className='text-[#1F451A] flex rounded items-center cursor-pointer gap-4 text-xl' onClick={() => history('/')}>
            <AiOutlineLeftCircle fontSize={28}/> Back 
          </button>
        </div>
        {isLoading
                  ? 
                  <Spinner /> 
                  :
        <div className='flex lg:flex-row productDetails md:flex-col justify-between mt-10 mb-10 gap-10'>
          <div className='w-full'>
            <img src={product.product_image} alt='' className='productDetailsImg1'/>
            <div className='flex pt-5 w-full justify-start gap-10 items-center' >
            <img src={product.product_images} alt="" className='productDetailsImg rounded-md' />   
            {/* {product.product_images?.map((pic) => {
              <img src={pic} alt="" className='productDetailsImg rounded-md' />    
            })}         */}
            </div>
          </div>
          <div className='flex flex-col text-start space-y-10  w-full items-start'>
            <h3 className='text-black text-3xl'>{product.label}</h3>
            <p className='text-[#1F451A] text-2xl '>$ {product.price}</p>
            <div className='text-justify text-[#2D2D2D] text-xl font-light w-8/12'>{product.description}</div>
            <div>
              <ul className='space-y-5'>
                <li className='flex justify-between text-justify gap-20 items-center'>
                  <span className='text-black text-2xl font-normal'>Brand; </span>
                    {product?.brand?.label}
                </li>
                <li className='flex justify-between text-justify items-center'>
                  <span className='text-black text-2xl font-normal'>Brand Logo; </span>
                  <img src={product?.brand?.logo} className="rounded-full object-cover w-auto h-32"  alt='' />
                </li>
                {product.metas?.map((meta) => (
                      <li className='flex justify-between text-justify gap-20 items-center' key={meta.id}>
                      <span className='text-black text-2xl capitalize font-normal'>{meta.option}; </span>
                            {meta?.values?.map((value, index) => (
                           <div key={index} className="ml-8 mt-2">
                                <button className='text-[#1F451A] text-xl rounded p-3'>{value?.size  ? `size: ${value?.size}`  : value }</button>
                                <button className='text-[#1F451A] text-xl rounded p-3'>{value?.price ? `price:  $${value?.price}` : ""}</button>
                              </div>
                            ))}
                    </li>
                      ))} 
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
              <p className='' >
                <button 
                className='flex justify-center items-center text-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-3 w-full'
                onClick={() => addToCartHandler()}
                >
                  <BsCart fontSize={28}/> Add to cart
                </button>
              </p>
            </div>
          </div>
        </div>
        }

        <div className='pt-10'>
          <h1 className=' text-3xl font-normal mb-10 text-[#2D2D2D] shopText'>Related Products</h1>
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
              {related.map(cat => (
                <SwiperSlide key={cat.product_id}>
                  <div className='w-full h-full bg-white rounded-lg border flex flex-col justify-between p-5 space-y-10 hover:shadow-md'>
                    <img src={cat.product_image} alt="" className='rounded-md w-auto h-auto' />
                    <div className='text-2xl text-start text-[#1F451A] font-normal'>{cat.label}</div>
                    {/* <button className='bg-[#1F451A] text-white p-3 cursor-pointer rounded-md text-xl'> <BsCart fontSize={28}/> Add to cart</button> */}
                    <a href='/carts' className='' >
                      <button className='flex justify-center items-center text-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-3 w-full'
                        onClick={() => addToCartHandler()}>
                        <BsCart fontSize={28}/> Add to cart
                      </button>
                    </a>
                  </div>                
                </SwiperSlide>     
              )) }
            </Swiper>
}
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
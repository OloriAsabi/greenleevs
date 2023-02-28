    /* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {AiOutlineLeftCircle, AiOutlineDelete} from 'react-icons/ai';
import {IoIosRemoveCircleOutline, IoIosAddCircleOutline} from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import {BsCart} from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { Mousewheel } from 'swiper';
import visa from '../assests/Vector (1).png';
import master from '../assests/master.png';
import american from '../assests/american.png';
import { useDispatch } from 'react-redux';
import { addCartItem, clearCart, removeCartItem, updateCart } from '../reducers/auth';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DeleteProductFromCart, GetCart, GetPopularProducts, GetRecentlyViewed, PostCart, UpdateCart, WipeCart } from '../apis/api';
import { Spinner } from '../components';

const Carts = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [carts, setCarts] = useState([]);
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [recent, setRecent] = useState([]);

  const { cart } = useSelector(state => state.auth);

  const getPopularProducts = useCallback(() => {
    setIsLoading(true)
    GetPopularProducts()
    .then((res) => {
      if (res.status === 200) {
        const data = res.data.data
    
        setPopular(data)
        setIsLoading(false)
    }else{
      toast.error(res.data.message);
    }
    })
  },[]);

  const getRecentlyView = useCallback(() => {
    setIsLoading(true)
    GetRecentlyViewed()
    .then((res) => {
      if (res.status === 200) {
        const data = res.data.data
    
        setRecent(data)
        setIsLoading(false)
    }else{
      toast.error(res.data.message);
    };
    }).catch((e) => {
      toast.error(e);
      });
  },[]);

  useEffect(() => {
    GetCart()
    .then((res) => {
    if (res.status === 200) {
      const data = res.data.data
  
      setCarts(data)
      setIsLoading(false)
      }else{
        toast.error(res.data.message);
      }
    }).catch((e) => {
      toast.error(e);
    });
    getPopularProducts();
    getRecentlyView();
  },[]);

  const updateCartHandler = async (cart, newQuantity) => {
    if (newQuantity < 1 || newQuantity > cart.product.countInStock) {
      toast.error('Sorry. Product is out of stock');
      return;
    }
  
    const updatedCart = {
      ...cart,
      quantity: newQuantity,
      price: cart.product.price * newQuantity,
    };
  
    const updatedCarts = carts.map((c) => (c.product_id === updatedCart.product_id ? updatedCart : c));
    setCarts(updatedCarts);
  
    try {
      const response = await UpdateCart({
        product_id: cart.product_id,
        quantity: newQuantity,
      });
  
      if (response.data.status === 'success') {
        dispatch(updateCart(updatedCart));
        toast.success(`${cart.product.label} updated in the cart`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
      toast.error('Something went wrong. Please try again later.');
    }
  };
  
  const addToCartHandler = async (e) => {
    const existItem = cart.cartItems.find((x) => x._id === e.product_id);

    const quantity = existItem ? existItem.quantity + 1 : 1;
        if (e.countinStock < quantity) {
          toast.error('Sorry. Product is out of stock');
      return;
    }
    const body = {
      product_id: e.product_id,
      quantity: quantity,
    }
    PostCart(body)
      .then((res) => {
        dispatch(addCartItem(
            {
            _key: e.product_id,
            name: e.label,
            countInStock: e.countinStock,
            slug: e.slug,
            price: e.price,
            image: e.product_image,
            quantity,
          },
        ));
        if(res.data.status === 'success'){
           toast.success(`${e.label} is added to the cart`);
           window.location.reload(); 
        }else{
          toast.error(res.data.message);
        }
      })
  };

  const deleteProductFromCart = (cart) => {
    const updatedCarts = carts.filter((c) => c.product_id !== cart.product_id);
    setCarts(updatedCarts);
    DeleteProductFromCart(cart.product_id)
    .then((res) => {
      dispatch(removeCartItem(updatedCarts))
      if(res.data.status === 'success'){
         toast.success(`${cart.product.label} has been deleted`);
      }else{
        toast.error(res.data.message);
      }
    })
  };
  
  const deleteAllFromCart = () => {
    WipeCart()
    dispatch(clearCart())
   };

 const totalPrice = carts.reduce((acc, cart) => acc + (cart.quantity * cart.product.price), 0);
  
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
            {cart.cartItems.length === 0 ?(
              <div>
                  <h4>
                    Cart is empty.{' '}
                    <button className='text-[#1F451A] flex rounded items-center cursor-pointer gap-4 text-xl' onClick={() => history('/shop')}>
                      <AiOutlineLeftCircle fontSize={28}/> Go shopping
                    </button>
                </h4>
              </div>
            ) : (
              <div>
            {carts.length > 0 ? (
               carts.map((cart) => (
                <div className='flex lg:flex-row productDetails justify-between gap-10 space-y-10' key={cart.product_id}>
                  <img src={cart.product.product_image} alt='' className='cartBg' />
                  <div className='flex flex-col items-center gap-10'>
                    <p className='text-xl'>{cart.product.label}</p>
                    {cart.quantity > 1 ? (
                    <p className='text-[#1F451A] text-center text-xl bg-[#8aa287] w-24 rounded-md p-2'>
                      {cart.price}
                    </p>
                  ) : (
                    <p className='text-[#1F451A] text-center text-xl bg-[#8aa287] w-24 rounded-md p-2'>
                      {cart.product.price}
                    </p>
                  )}
                  </div>
                  <div className='items-end text-end flex flex-col gap-10 cursor-pointer'>
                    <AiOutlineDelete fontSize={38} onClick={() => deleteProductFromCart(cart)} className='text-red-500' />
                    <div className='flex items-center justify-between gap-10 cursor-pointer'>
                      <button
                        onClick={() => {
                          updateCartHandler(cart, Math.max(cart.quantity - 1, 1));
                        }}
                        className='text-[#2D2D2D] cursor-pointer'>
                        <IoIosRemoveCircleOutline fontSize={38} className='text-[#2D2D2D] cursor-pointer' />
                      </button>
                      <div className='text-xl'>{cart.quantity}</div>
                      <button
                        onClick={() => {
                          updateCartHandler(cart, Math.max(cart.quantity + 1, 1));
                        }}
                        className='text-[#2D2D2D] cursor-pointer'>
                        <IoIosAddCircleOutline fontSize={38} className='text-[#2D2D2D] cursor-pointer' />
                      </button>
                    </div>
                  </div>
                </div>
              ))
              ) : (
                <p className='text-xl space-y-10'>Your cart is empty. Please go  
                <button className='text-[#1F451A] flex rounded items-center cursor-pointer gap-4 text-xl' onClick={() => history('/shop')}>
                <AiOutlineLeftCircle fontSize={28}/> Go shopping
              </button>
              </p>
              )}
              <button className=' text-center bg-[#1F451A] text-white mt-8 cursor-pointer rounded-md p-4 w-full'
              onClick={() => deleteAllFromCart()}>
                Delete
              </button>
              </div>
            )}
            </div>
          </div>
          <div className='w-full h-full bg-white rounded-lg border flex flex-col  p-10  border-gray-200 shadow-md'>
            <h3 className='text-2xl font-medium pb-5'>ORDER SUMMARY</h3>

            <div className='space-y-10 pt-5 pb-5'>
              <p className='flex justify-between text-slate-500'>Sub-total <span className='text-[#1F451A]'>{totalPrice}</span></p>
              {/* <p className='flex justify-between text-slate-500'>Shipping Charges <span className='text-[#1F451A]'>£10.00</span></p> */}
              <hr/>
              <p className='flex justify-between text-slate-500'>Total <span className='text-[#1F451A] text-xl'>{totalPrice}</span></p>
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
                }
              }}
              modules={Mousewheel}
              className="mySwiper">
              {recent.map(r => (
                <SwiperSlide key={r.product_id}>
                  <div className='w-full h-full bg-white rounded-lg border flex flex-col justify-between p-5 space-y-10 hover:shadow-md'>
                    <img src={r.product_image} alt="" className='rounded-md w-auto h-64 object-cover' />
                    <div className='text-2xl text-start text-[#1F451A] font-normal'>{r.label}</div>
                    <p className='text-center'>
                      <button className='flex justify-center text-center items-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-3 w-full'
                      onClick={() => addToCartHandler(r)}>
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
                }
              }}
              modules={Mousewheel}
              className="mySwiper">
              {popular.map(pop => (
                <SwiperSlide key={pop.product_id}>
                  <Link to={`/product/${pop.slug}`}>
                    <div className='w-full h-full bg-white rounded-lg border flex flex-col justify-between p-5 space-y-10 hover:shadow-md'>
                      <img src={pop.product_image} alt="" className='rounded-md w-auto h-64' />
                      <div className='text-2xl text-start text-[#1F451A] font-normal'>{pop.label}</div>
                      <div className='' >
                        <button className='flex justify-center items-center text-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-3 w-full'
                          onClick={() => addToCartHandler(pop)}>
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
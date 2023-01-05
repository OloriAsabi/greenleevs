import React, { useEffect, useState, useCallback } from 'react';
import {BsCheck2Circle } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { Swiper, SwiperSlide } from 'swiper/react';
import bg1 from '../assests/Rectangle 20 (1).png';
import bg2 from '../assests/Rectangle 20 (2).png';
import spot1 from '../assests/cannabis_PNG37 1.png';
import spot2 from '../assests/cannabis_PNG37 1 (1).png';
import spot3 from '../assests/cannabis_PNG37 1 (2).png';
import spot4 from '../assests/cannabis_PNG37 1 (3).png';
import bg5 from '../assests/Rectangle 20 (3).png';
import bg3 from '../assests/Rectangle 20.png';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import blog from '../assests/Rectangle 123.png';
import blog1 from '../assests/Rectangle 123 (2).png';
import blog2 from '../assests/Rectangle 123 (1).png';
import homeBg from '../assests/home_bg.png';

import visa from '../assests/Vector (1).png';
import master from '../assests/master.png';
import american from '../assests/american.png';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// import required modules
import { Navigation, Pagination } from 'swiper';
import { strainTypes } from '../data/data';
import { MdOutlineCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GetCategories, GetProducts, PostNewsletter } from '../apis/api';

/* eslint-disable */
const images =[
  bg1,
  bg2,
  bg3,
  bg5
];
const info =[
  'Spotlight: Oil',
  'Spotlight: Indica',
  'Spotlight: Tropical',
  'Spotlight: Mint Chip Gelato 3.5g'
];

const spotlight =[
  spot1,
  spot2,
  spot3,
  spot4
];

// eslint-disable-next-line react/prop-types
const SliderItems = ({pic,id, brand, price, title, brandImage, taste, content, }) => {
  return(
    <div key={id} className=' p-10 text-center tracking-widest leading-8'>
      <div className='flex flex-col space-y-5 items-center justify-center'>
        <img src={pic} className="w-48 h-48 rounded" alt='featured Products'/>
        <div className='rounded-full text-center '>
        <img src={brandImage} className="rounded-full object-cover w-auto h-auto"  alt='' />
        </div>
        <div className='font-bold'>{title}</div>
        <p className='font-medium'>Price: ${price}</p>
        {/* <p className='pb-5'>{salesPrice}</p> */}
        <div className='font-bold'>{taste}</div>
        <div>{content}</div>
      </div>
    </div>
  );
};

const Strain = () => {
  return(
    <div className='flex lg:flex-row md:flex-col productDetails sm:flex-col items-center justify-center -space-x-2 overflow-hidden'>
      {strainTypes.map((item) =>( <Item key={item.id} item={item} />))}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const Item = ({item}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {!open 
        ?(
          <div className='relative text-center ' key={item.id} onClick={() => setOpen(!open)}> 
            <img src={item.img} alt='eclipse' className='inline-block rounded-full ring-2' style={{ borderRadius:'50%', width: '200px', height:'200px', background: 'linear-gradient(0deg, rgba(45, 45, 45, 0.3), rgba(45, 45, 45, 0.3))'}}/>
            <button className='absolute  top-20 left-12 text-white p-3 font-normal text-center whitespace-normal text-2xl'>{item.title}</button>
          </div>
        ):(
          <div className='relative text-center w-full' key={item.id} onClick={() => setOpen(false)}> 
            <img src={item.img} alt='eclipse' className='strainOpenBg inline-block rounded-full ring-2' style={{ 
              borderRadius:'100px', width: '628px', height:'200px', 
              background: 'linear-gradient(0deg, rgba(45, 45, 45, 0.3), rgba(45, 45, 45, 0.3))'}}/>
            <div className='absolute text-center top-8 left-0 '>
              <div className='flex flex-row justify-center p-5 text-white items-center'>
                <div className=' p-3 font-normal text-xl'>
                  <div className='font-normal'>{item.title}</div>
                  <p className=''>{item.description}</p>
                </div>
                <MdOutlineCancel fontSize={50} color="white"className='cursor-pointer text-center border-transparent' onClick={() => setOpen(open)}/>
              </div> 
            </div>
          </div>  
        )}
    </div>  
  );
};
 
const Home = () => {
  const [value, setValue] = useState(0);
  const [infos, setInfos] = useState(0);
  const [spot, setSpot] = useState(0);
  const [checked, setChecked] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getDataProducts =  useCallback(() => {
    GetProducts()
    .then((response) => {
    const data = response.data.data
      
    setProducts(data)
    }).catch((e) => {
    console.log(e);
    })
  },
  [products]);
  

  const getDataCategory =  useCallback(() => {
    GetCategories()
    .then((response) => {
    console.log(response);
    const data = response.data.data
      
    setCategories(data)
    }).catch((e) => {
    console.log(e);
    });
  },
  []);
  


  useEffect(() => {
    const interval = setInterval(() => {
      if (value === images.length - 1 && infos === info.length - 1 && spot === spotlight.length -1) {
        setValue(0);
        setInfos(0);
        setSpot(0);
      } else {
        setValue(value + 1);
        setInfos(infos + 1);
        setSpot(spot + 1);
      }
    }, 3000);
  
    return () => {
      clearInterval(interval);
    };
  }, [infos, spot, value]);

  useEffect(() => {
    getDataProducts();
  },[]);

  useEffect(() => {
  getDataCategory()
  },[]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm();

  const { enqueueSnackbar } = useSnackbar();


  const submitHandler = async (data) => {
    console.log('Data', data );
    const body = {
      email: data.email,
      first_name: "Asabi",
      last_name: "Oduntan"
    };
    try {
      PostNewsletter(body)
      .then((response) => {
        console.log("Response ",response);
        const reply = response.data
        enqueueSnackbar(reply.message , { variant: 'success' });
      });
      enqueueSnackbar('Newsletter Subsrcibed Successfully', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Newsletter Subscrition Failed', { variant: 'error' });
    }
  };


  return (
    <div className=' max-w-3xl my-8  w-full '>
      <div className=' w-screen bg-white'>
        
        <div className='relative h-full small overflow-x-hidden'>
          <div className='text-[#1F451A] lg:w-1/2 md:w-full flex ml-20 mr-20 pb-20 leading-8 flex-col text-justify space-y-20 tracking-widest '>
            <h1 className='font-extrabold text-4xl'>
            Green leevs provides you with the best home grown plant in the city
            </h1>
            <p className='text-2xl text-justify font-light'>
            Discover BC Cannabis Stores’ diverse range of edibles, concentrates, cannabis oils,
            capsules, CBD oils, pre-rolls, and dried flower—available  in indica, sativa, and hybrid 
            options with varying potencies of CBD and THC. Cannabis accessories are also
            available to purchase.
            </p>
            <a href='/shop'>
              <button className='bg-[#1F451A] cursor-pointer hover:scale-x-110 font-normal text-xl text-white  rounded gap-2 p-3 w-32 h-20'>Buy Now</button>
            </a>
          </div>
          <img src={homeBg} alt='header background' className='absolute -right-32 homeBg top-0  h-full bg-no-repeat object-cover' />
        </div>
      </div>

      <div className='w-screen '>  
        <div className='pb-20 pt-20 container mx-auto small text-[#1F451A] text-center tracking-widest leading-8'>
          <h1 className='font-bold text-4xl'>Why Green Leevs</h1>
          <p className='text-2xl font-normal p-5 opacity-50 '>Here’s why people choose to order from us</p>
          <div className='flex flex-row xsflex  gap-10 justify-between pt-10 items-center'>
            <div className='max-w-sm bg-white rounded-lg border border-gray-200 shadow-md flex flex-col justify-center items-center space-y-5  p-10'>
              <BsCheck2Circle fontSize={38} fontWeight={400} className="font-extrabold"/>
              <h3 className='opacity-50 font-bold text-3xl'>Clean, legal weed</h3>
              <p className='opacity-50 text-2xl font-normal'>Shop high-quality products from our <br/> reliable sources</p>
            </div>
            <div className='max-w-sm bg-white rounded-lg border border-gray-200 shadow-md flex flex-col justify-center items-center space-y-5 p-10'>
              <TbTruckDelivery fontSize={38} fontWeight={400} className="font-extrabold" />
              <h3 className='opacity-50 font-bold text-3xl'>2-Day delivery</h3>
              <p className='opacity-50 text-2xl font-normal'>Expected delivery to keep your <br/> cannabis fresh at all time.</p>
            </div>
            <div className='max-w-sm bg-white rounded-lg border border-gray-200 shadow-md flex flex-col justify-center items-center space-y-5  p-10'>
              <TbTruckDelivery fontSize={38} fontWeight={400} className="font-extrabold"/>
              <h3 className='opacity-50 font-bold text-3xl'>2-Day delivery</h3>
              <p className='opacity-50 text-2xl font-normal'>Expected delivery to keep your <br/> cannabis fresh at all time.</p>
            </div>
          </div>
        </div>    
      </div>

      <div className='w-screen'>  
        <div className='pb-20 container mx-auto small text-[#1F451A] text-center tracking-widest leading-8'>
          <div className='flex items-center justify-between'>
            <div className='font-bold text-2xl '>Featured Products</div>
            <div className='font-bold text-2xl '>See All</div>
          </div>
          <div className='pt-10 w-full'>
            <Swiper 
              navigation={true} 
              pagination={true} 
              breakpoints={{
                640:{
                  width: 640,
                  slidesPerView: 1
                },
                768:{
                  width: 768,
                  slidesPerView: 2
                },
                1400:{
                  width: 1400,
                  slidesPerView: 3
                },
              }}
              modules={[Navigation, Pagination]} 
              className="mySwiper">
              {products.map((items) => (
                <SwiperSlide key={items.product_id}>
                  <Link to={`/product/${items.sku}`}>
                    <SliderItems 
                      id={items.product_id} 
                      price={items.price}
                      brandImage={items?.brand?.logo} 
                      brand={items?.brand?.label} 
                      pic={items.product_image}
                      title={items.label}
                    //   content={items.metas?.map((meta) => (
                    //     <div className='flex justify-between text-center ml-8' key={meta?.id}>
                    //     <h5 className='mt-2 pr-3 pt-3 pb-3 capitalize text-xl font-bold'>{meta?.option}: </h5> 
                    // {meta.values.map((value, index) => (
                    //     <div key={index} className="ml-8 mt-2">
                    //     <button className='text-[#1F451A] text-xl rounded p-3'>{value?.size  ? `size: ${value?.size}`  : value }</button>
                    //     <button className='text-[#1F451A] text-xl rounded p-3'>{value?.price ? `price:  $${value?.price}` : ""}</button>
                    //     </div>
                    //     ))}
                    //     </div>
                    //   ))} 
                    />
                  </Link>
                </SwiperSlide>                       
              ))}
            </Swiper> 
          </div>
          <div>
            <a href='/shop'>
              <button className='border border-[#1F451A] p-5 cursor-pointer hover:scale-x-110 rounded-md w-48 font-normal text-xl'>SHOP NOW</button>
            </a> 
          </div>
        </div>
      </div>

      <div className='pt-10 relative pb-10 w-screen h-full spotBg'>
        <img src={images[value]} alt="img" className='h-full  w-full object-cover'/>     
        <div className='w-screen items-center justify-center flex'>
          <div className='absolute small top-0 mx-auto container flex flex-row h-full  justify-between items-center '>
            <div className='flex flex-col space-y-10  text-white text-start tracking-widest leading-8'>
              <h3 className='text-4xl pt-5 font-bold'>{info[infos]}</h3>
              <p className='text-xl'>Here’s a sweet choice: Rich, earthy, minty pine is mixed with floral notes <br/>
                and a dab of spice on the finish. each high-THC hybrid bud is coated in <br />
                icy trichomes perfect for the summer heat</p>
              <a href='/shop'>
                <button className='border hover:scale-x-110 border-white p-5 cursor-pointer rounded-md w-48 font-normal text-xl'>
                    Shop Now
                </button>
              </a>
            </div>    
            <div>
              <img src={spotlight[spot]} alt='spotlight' className='text-end lg:w-72 lg:h-72 sm:w-52 sm:h-52 md:w-52 md:h-52 object-cover' />
        
            </div>
          </div>
        </div>
      </div>

      <div className='w-screen '>  
        <div className="container  accessorySide  mx-auto pt-20 pb-20 small text-[#1F451A]">
          <h2 className='text-3xl text-center pb-10 font-bold'>Shop By Category</h2>
          <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10  justify-between items-center'>
            {categories.map((cat) => (
              <Link to={`/shop/${cat.slug}`} key={cat.slug}>
                <div key={cat.slug} className='w-full h-full bg-white rounded-lg border flex flex-col items-center p-10  border-gray-200 shadow-md'>
                  <img  src={cat.image}  alt="" className='rounded-md w-full h-full' />
                  <div className='text-2xl capitalize font-medium p-5'>{cat.label}</div>
                  {/* <p className='pt-5 text-xl pb-5'>{cat.price}</p> */}
                  <button className='bg-[#1F451A] text-white p-3 cursor-pointer rounded-md w-full hover:scale-x-110 font-normal text-xl'>Explore</button>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className='pt-10 dontShow small'>
          <div className='conatiner mx-auto '>
            <h1 className='text-3xl font-bold mb-10 text-[#2D2D2D] text-start shopText'>Shop By Categories</h1>
            <div className='flex flex-col justify-between items-center'>
              {categories.map(cat => (
                <Link to={'/shop/accessories'} key={cat.slug}>
                  <div className='flex flex-col justify-betwe items-center'>
                    <div className='text-2xl p-3 cursor-pointer text-center rounded-md w-72 mb-10 hover:scale-x-110 border border-[#1F451A] capitalize text-[#1F451A] font-normal'>{cat.label}</div>
                  </div>
                </Link>               
              )) }
            </div>
          </div>
        </div>
      </div>

      <div className='contactBg w-screen h-full'>
        <div className='flex lg:flex-row sm:flew-col small md:flex-col xsflex container mx-auto space-y-10 justify-between items-center pt-20 pb-20 text-white tracking-widest leading-8'>
          <div className='text-start space-y-10'>
            <h2 className='font-bold text-3xl'>Join Our Circle</h2>
            <p className='font-normal text-xl'>Sign up to receive emails from Green leevs about new products,
              <br/> special offers, cannabis education and much more. You can 
              <br/> unsubscribe at any time.</p>
          </div>
          <div className='max-w-lg bg-white rounded-lg border border-gray-200 shadow-md '>
            <form className='p-10' onSubmit={handleSubmit(submitHandler)}>
              <div>
                <label
                  htmlFor="email"
                  className={`block pb-3 2 ${
                    errors.email ? 'text-red-400' : 'text-gray-700 '} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-xl`}>
                    Email 
                  <span className='text-red-500'> *</span>
                </label>
                <input 
                  name="email" 
                  id="email" 
                  type="text" 
                  className={`block w-full ${
                    errors.email ? 'text-red-400 border-red-400' : 'text-gray-700 '} px-3 py-1 mb-2 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register('email', { 
                    required: 'Email is Required!!!' ,
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: 'Invalid email address',
                    }})}
                  onKeyUp={() => {
                    trigger('email');
                  }}
                  required={true}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    Email is Required!!!
                  </p>
                )}
              </div>
              <div className='flex items-start  pt-10 pb-10'>
                <input 
                  aria-describedby="checkbox-1" 
                  type="checkbox"
                  className="bg-gray-50 border-[#1F451A] focus:ring-3 focus:ring-blue-300 h-16 w-16 rounded"  
                  checked={checked}
                  onChange={e => setChecked(e.target.checked)}/>
                <label htmlFor="checkbox-1" className="text-xl ml-3 font-medium opacity-70 text-gray-500"> <span className='text-red-500'>*</span> By clicking this box, I consent to the Green leevs sending me marketing emails, such as information about new products and cannabis education. I understand that I can unsubscribe</label>
              </div>
              <button 
                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-[#1F451A] border border-transparent  hover:bg-[#1F451A] focus:ring
                    focus:ring-purple-300 mt-4 hover:scale-x-110 h-12 w-full" type="submit" to="/">
                        Submit
              </button>
            </form>

            <div className='text-[#2D2D2D] p-10 font-normal'>
              <div>Terms & Conditions</div>
              <div className='opacity-70'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-screen '>  
        <div className='tracking-widest small leading-8 pt-20 pb-20 container mx-auto text-[#1F451A]'>
          <div className='flex lg:flex-row sm:flew-col xsflex md:flex-col spcae-y-10 gap-10 justify-between items-center text-center'>
            <div className=' bg-white rounded-lg hover:border border-gray-200 shadow-md flex flex-col justify-center items-center space-y-5  p-10'>
              <img src={blog} alt="Blog pic" className='rounded-md w-full h-full'/>
              <div className='text-xl font-normal p-5'>Why can’t I find what i’m looking for?</div>
              <button className='bg-[#1F451A] text-white p-3 cursor-pointer hover:scale-x-110 rounded-md w-full font-normal text-xl'>Learn more</button>
            </div>
            <div className=' bg-white rounded-lg hover:border border-gray-200 shadow-md flex flex-col justify-center items-center space-y-5  p-10'>
              <img src={blog1} alt="Blog pic" className='rounded-md w-full h-full'/>
              <div className='text-xl font-normal p-5'>Why late delivery?</div>
              <button className='bg-[#1F451A] text-white p-3 cursor-pointer hover:scale-x-110 rounded-md w-full font-normal text-xl'>Learn more</button>
            </div>
            <div className=' bg-white rounded-lg hover:border border-gray-200 shadow-md flex flex-col justify-center items-center space-y-5  p-10'>
              <img src={blog2} alt="Blog pic" className='rounded-md w-full h-full'/>
              <div className='text-xl font-normal p-5'>Don’t drive high: it’s not worth the risk</div>
              <button className='bg-[#1F451A] text-white p-3 cursor-pointer rounded-md w-full font-normal hover:scale-x-110 text-xl'>Learn more</button>
            </div>
          </div>
        </div>
      </div>

      <div className='w-screen text-center tracking-widest leading-8 pt-20 pb-20 h-full strainBg'>
        <div className='container mx-auto small'>
          <h1 className='text-black font-semibold text-4xl'>Strain Types & Effects</h1>  
          <p className='text-black opacity-40 text-2xl font-normal p-5'>Let Green leevs help you discover the benefits of cannabis. Our Green leevs locations carry only <br/> the best marijuana & CBD, so let guide you in-store and online.</p> 
          <Strain />
          <p className='text-black opacity-40 text-xl font-normal p-5'>This statement has not been evaluated by the FDA. It is not intended to diagnose, treat, cure or prevent any disease.</p> 
        </div>  
      </div>

      <div className='w-screen text-center tracking-widest leading-8 p-20 mt-10 mb-10 StockBg h-full '>
        <div className='text-center flex flex-col items-center small justify-center text-white p-5'>
          <h3 className='font-bold text-3xl pb-10'>Yes, It’s in Stock</h3>
          <a href='/shop'>
          <button className='bg-transpent hover:scale-x-110 border border-white text-white p-3 cursor-pointer rounded-md w-72 font-normal text-2xl'>SHOP OIL</button>
          </a>
        </div>
      </div>

      <div className='w-screen text-center tracking-widest leading-8 p-20 mt-10 mb-10 S HomeMerchandiseBg h-full '>
        <div className='text-center flex flex-col items-center small justify-center text-white p-5'>
          <h3 className='font-bold text-3xl pb-10'>Shop for your Merchandise product here!!!</h3>
          <a href='/comingsoon'>
          <button className='bg-transpent border hover:scale-x-110 border-white text-white p-3 cursor-pointer rounded-md w-72 font-normal text-2xl'>COMING SOON</button>
          </a>
        </div>
      </div>

      <div className='w-screen text-center tracking-widest leading-8 p-20 mt-10 mb-10 bg-white h-full '>
        <div className='small'>
          <h3 className='text-[#1F451A] text-3xl font-semibold'>Payment Methods</h3>
          <div className='flex flex-row justify-center space-x-10 p-10 items-center text-center'>
            <img src={visa} alt="pay" className='mt-10 w-auto h-auto'/>
            <img src={american} alt="pay" className='mt-10 w-auto h-auto' />
            <img src={master} alt="pay" className='mt-10 w-auto h-auto' />
            <img src={visa} alt='pay' className='mt-10 w-auto h-auto' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
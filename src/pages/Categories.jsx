/* eslint-disable */
import React, { useState } from 'react';
import { cbdContents, plant_type, thcContents } from '../data/data';
import { BiMenuAltRight } from 'react-icons/bi';
import { BsCart, BsGrid } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useParams  } from 'react-router-dom';
import visa from '../assests/Vector (1).png';
import master from '../assests/master.png';
import american from '../assests/american.png';

import { Mousewheel } from 'swiper';
import { FlexStyle, GridStyle, SidebarCat, Spinner } from '../components';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { FilterProducts, GetBrands, GetProductsByCategoryId, GetPopularByCategory, PostCart } from '../apis/api';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useStateContext } from '../contexts/ContextProvider';

const Categories = () => {
  const [openNav, setOpenNav] = useState(false);
  const { id }  = useParams();
  const [popular, setPopular] = useState([])
  const [isGrid, setIsGrid] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const { state, dispatch } = useStateContext();
  const { cart } = state;
  const [products, setProducts] = useState([]);

  const [brands, setBrands] = useState([]);
  const [potency, setPotency] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sort: 'default',
      outofstock: false
    }
  });

  const submitSort = (data) => {
    console.log(data);
  };

  const getPopularByCategories =  useCallback(() => {
    setIsLoading(true)
    GetPopularByCategory(id)
    .then((res) => {
      console.log("Popular by Categories ",res);
          const data = res.data.data
      
          setPopular(data)
          setIsLoading(false)
          }).catch((e) => {
          console.log(e);
          });
  },
  []);

  const getBrands =  useCallback(() => {
    GetBrands()
    .then((res) => {
      console.log("Brands",res);
      if (res.status === 200) {
          const data = res.data.data
      
          setBrands(data)
        }else{
          console.log(res.statusText);
        }
          }).catch((e) => {
          console.log(e);
          });
  },
  []);

  const getDataCategoryById = useCallback(() => {
    setIsLoading(true);
    GetProductsByCategoryId(id)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data;
          setProducts(data);
          setIsLoading(false);
        } else {
          console.log(res.statusText);
          enqueueSnackbar(res.statusText, { variant: res.status });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  useEffect(() => {
    getDataCategoryById();
  }, [getDataCategoryById]);

  const toggleGrid = () => setIsGrid(!isGrid);

  useEffect(() => {
    getBrands();
    },[]);

  useEffect(() => {
    getPopularByCategories();
  }, []);
  
  const handleFilterSubmit = async (formValues) => {
    await FilterProducts(id, formValues['plant'], formValues['brand'], potency, formValues['outOfStock'], formValues['sort']).then((res) => {
      if (res && res.status === 200) {
        console.log(res);
        if (res.data != null && res.data != undefined && typeof res.data == "object") {
          setProducts(res.data.data);
        } else {
          // alert error if we so choose to
        }
      } else {
        // console.log(res.statusText);
      }
    });
  };


  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      handleFilterSubmit(value);
    });


    return () => subscription.unsubscribe();
  }, [watch]);

  const addToCartHandler = async (e) => {
    const existItem = cart.cartItems.find((x) => x._id === e.product_id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
        if (e.countinStock < quantity) {
      enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
      return;
    }
    const body = {
      product_id: e.product_id,
      quantity: quantity,
    }
    PostCart(body)
      .then((res) => {
        console.log(res);
        dispatch({
          type: 'CART_ADD_ITEM',
          payload: {
            _key: e.product_id,
            name: e.label,
            countInStock: e.countinStock,
            slug: e.slug,
            price: e.price,
            image: e.product_image,
            quantity,
          },
        });
        if(res.data.status === 'success'){
           enqueueSnackbar(`${product.label} added to the cart`, {
          variant: res.status, 
        });
              // history('/carts')
        }else{
          enqueueSnackbar(res.data.message, { variant: res.data.status });
        }
      })
  };

console.log(products);
  
return (
  <div>
    <div className='w-screen flex h-full '>
    <div
      className= "w-72 bg-white accessorySide border border-l-5 flex flex-col border-gray-300  h-full p-5  pb-10 pt-10 relative duration-300"
    >
       <h5 className='pt-5'>SUBCATEGORIES</h5>
       <div className='pt-6'>
         <p className='pb-5 capitalize'>All {id}</p>
       <ul className='text-[#2D2D2D] text-sm  pb-5 cursor-pointer text-start'>
           {brands.map((brand) => (
            <div className='' key={brand.id}>
                  <li className='pb-2 hover:border-b-2 w-8 font-medium'>{brand.label}</li>
            </div>
          ))}
        </ul>
        <hr/>
      </div>
  <form>
        <div className='pt-6'>
                <p className='pb-5'>BRANDS</p>
                <div className='flex flex-col justify-between space-y-5 items-start'>
                {brands.map((brand) => (
                <div  className='flex mb-5' key={brand.id}>
                <input id={brand.id} 
                  type="checkbox" 
                  name={brand.label} 
                  value={brand.label}
                  {...register('brand')} 
                  className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                  aria-labelledby={brand.label} 
                  aria-describedby={brand.label} /> 
                  <label htmlFor={brand.label} className="text-sm text-[#2D2D2D] ml-2 block">
                    {brand.label}
                    </label>
                    </div>
                ))}
                  </div>
          <hr/>
        </div>

        <div className='pt-6'>
                <p className='pb-5'>PLANT TYPES</p>
                 <div className='flex flex-col justify-between pb-5 space-y-5 items-start'>       
                    {plant_type.map((item) => (
                      <div className='flex ' key={item.id}>
                        <input 
                          value={item.type}
                          id={item.id}
                          type="checkbox" 
                          name={item.type} 
                          className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                          aria-labelledby={item.type} 
                          aria-describedby={item.type} 
                          {...register('plant')} 
                           />             
                    <label htmlFor={item.type}  className="text-sm text-[#2D2D2D] ml-2 block">
                      {item.type} 
                    </label>
                    </div>
                    ))}               
                </div>
            <hr/>
        </div>
        <div className='flex flex-col pt-5 w-full'>
        <p className='pb-5'>Select THC Potency</p>
               <select
               name="potency"
               {...register('potency')}
               >                
                   <option value="default">All</option>
                   {thcContents.map((thc) => (
                           <option value={thc.name} key={thc.id}>{thc.name}</option>
                   ))}
          </select>

          <p className='pb-5'>Select CBD Potency</p>
            <select
               name="potency"
               {...register('potency')}
               >
                   <option value="default">All</option>
                   {cbdContents.map((cbd) => (
                           <option value={cbd.name} key={cbd.id}>{cbd.name}</option>
                   ))}
          </select>
        </div>      

          <div id='outofstock' className='flex justify-between pt-10 pb-5'>
            <p className='pb-5 text-[#2D2D2D] text-sm'>Out of Stock</p>


            <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              {...register('outofstock')}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#546052] dark:peer-focus:ring-[#1F451A] dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:[#1F451A]"></div>
          </label>
            </div>
    </form>
    </div>
      <div className="h-full flex-1 small p-7">   
        <div className='flex justify-between pt-10 pb-6'>
          <h4 className='text-2xl font-medium capitalize pb-5' >ALL {id}</h4>
          <div className='flex justify-between items-center gap-10'>
            <div>
              <form onSubmit={handleSubmit(submitSort)} >
                <div>
                  <div className=''>
                    <select id="sort"  
                      className={
                        `w-24 ${
                        errors.sort ? ' border-red-400' : ''} bg-[#1F451A] text-white cursor-pointer rounded-md accessorySide hover:scale-x-110 font-normal text-xl border p-4
                        `}
                      {...register('sort')}>
                      <option 
                        defaultValue="select" value="default"> 
                          Sort
                      </option>
                      <option value="popular">Popular</option>
                      <option value="brand">Brand</option>
                      <option value="lowest">Price: Low to High</option>
                      <option value="highest">Price: High to Low</option>
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
            <div>
            <button 
            onClick={toggleGrid}     
            className='rounded bg-[#c9e7c5] accessorySide  hover:scale-x-110  p-3  cursor-pointer'>
                <BsGrid fontSize={28}/>
            </button>
            </div>
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
        {isGrid ?   
            <FlexStyle filteredProducts={products} isLoading={isLoading} /> :
             <GridStyle filteredProducts={products} isLoading={isLoading} /> }
        <hr />
      </div>
    </div>
    <div className='pt-10 accessorySide  small pl-10 pr-`10 '>
      <h1 className='text-3xl font-bold mb-10 text-[#2D2D2D] capitalize text-start shopText'>Popular on {id}</h1>
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
                <div className='w-full h-full bg-white rounded-lg border flex flex-col justify-between p-5 space-y-10 hover:shadow-md'>
                  <img src={pop.product_image} alt="" className='rounded-md w-full h-9/12 object-cover' />
                  <div className='text-2xl text-start text-[#1F451A] font-normal'>{pop.label}</div>
                  <div className='' >
                    <button className='flex text-center items-center justify-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-3 w-full'
                      onClick={() => addToCartHandler(pop)}>
                      <BsCart fontSize={28}/> Add to cart
                    </button>
                  </div>
                </div>                
              </SwiperSlide>     
            )) }
        </Swiper>
}
      </div>
    </div>
    <div className='pt-10 dontShow small'>
      <div className='conatiner mx-auto '>
        <h1 className='text-3xl font-bold mb-10 text-[#2D2D2D] text-start shopText'>Popular on {id}</h1>
        <div className='flex flex-col justify-between items-center'>
          {popular.map(pop => (
            <Link to={`/shop`} key={pop.product_id}>
              <div className='flex flex-col justify-betwe items-center'>
                <div className='text-2xl p-3 cursor-pointer rounded-md w-72 mb-10 hover:scale-x-110 border border-[#1F451A] capitalize text-[#1F451A] font-normal'>{pop.label}</div>
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

export default Categories;
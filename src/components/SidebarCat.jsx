/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import {BsFilter} from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {RiArrowDropDownLine } from 'react-icons/ri';
import { FilterProducts, GetBrands } from '../apis/api';
import { cbdContents, plant_type, thcContents } from '../data/data';
import FlexStyle from './FlexStyle';
import GridStyle from './GridStyle';

const SidebarCat = ({ setOpenNav, openNav, id }) => {
  // const history = useNavigate();
  const [openPotent, setOpenPotent] = useState(false);
  const [openPotentcy, setOpenPotentcy] = useState(false);
  const [openPlant, setOpenPlant] = useState(false);
  const [openBrand, setBrandOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [potency ] = useState('');

  const [brands, setBrands] = useState([]);
  
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
  
 useEffect(() => {
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
  
  const submitHandler = async (formValues) => {
    await FilterProducts(id, 
    formValues['plant'], 
    formValues['brand'], 
    potency, 
    formValues['outOfStock'], 
    formValues['sort']).then((res) => {
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
    const subscription = watch((value,) => {
      submitHandler(value);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const FilteredProducts = ({ products }) => {
    return (
      <div>
        <FlexStyle filteredProducts={products} /> 
        <GridStyle filteredProducts={products} />
      </div>
    );
  };
  
  
  

  return (
    <div>
      <FaTimes fontSize={28} className="text-black cursor-pointer fixed top-4 right-4 font-light" onClick={() => setOpenNav(false)} />  

      <div className='fixed  w-full top-20 p-10 '>
        <div className='w-full small space-y-8'>
  
    
          <div className='pt-6'>
          <form onSubmit={handleSubmit(submitSort)} >
             <div className=''>
               <select id="sort"
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
         </form>   
          </div>
    

          <div className='pt-6'>
            <div className='flex justify-between'>
              <p className='pb-5'>BRANDS</p>
              <button
                className=''
                onClick={() => setBrandOpen(!openBrand)}>
                <RiArrowDropDownLine fontSize={28}/>
              </button>
            </div>
            {openBrand && (
              <form onSubmit={handleSubmit(submitHandler)} className="w-full pt-5 pb-5 space-y-10">
            <div className='flex flex-col justify-between space-y-5 pb-6 items-start'>
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
              </form>
            )}
            <hr/>
          </div>
          <div className='pt-6'>
            <div className='flex justify-between'>
              <p className='pb-5'>PLANT TYPES</p>
              <button
                className=''
                onClick={() => setOpenPlant(!openPlant)}>
                <RiArrowDropDownLine fontSize={28}/>
              </button>
            </div>
            {openPlant && ( 
              <form onSubmit={handleSubmit(submitHandler)} className="w-full pt-5 pb-5 space-y-10">
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
              </form>
            )}
            <hr/>
          </div>
          <div className='pt-6'>
            <div className='flex justify-between'>
              <p className='pb-5'>THC POTENCY</p>
              <button
                className=''
                onClick={() => setOpenPotentcy(!openPotentcy)}>
                <RiArrowDropDownLine fontSize={28}/>
              </button>
            </div>
            {openPotentcy && (
              <form onSubmit={handleSubmit(submitHandler)} >
                <div>
                  <div className='flex flex-col w-full'>
                  <select
                    name="potency"
                      {...register('potency')}
                      >                
                          <option value="default">All</option>
                          {thcContents.map((thc) => (
                                  <option value={thc.name} key={thc.id}>{thc.name}</option>
                          ))}
                  </select>
                    {errors.THC && (
                      <p className="text-red-500 text-sm mt-2">
                 Select a THC POTENCY
                      </p>
                    )}
                  </div>
                </div>
              </form>    
            )}
            <hr/>
          </div>
          <div className='pt-6'>
            <div className='flex justify-between'>
              <p className='pb-5'>CBD POTENCY</p>
              <button
                className=''
                onClick={() => setOpenPotent(!openPotent)}>
                <RiArrowDropDownLine fontSize={28}/>
              </button>
            </div>
            {openPotent && (
              <form onSubmit={handleSubmit(submitHandler)} >
                   <div className='flex flex-col pt-5 pb-5 w-full'>
                  <select
                      name="potency"
                      {...register('potency')}
                      >
                          <option value="default">All</option>
                          {cbdContents.map((cbd) => (
                                  <option value={cbd.name} key={cbd.id}>{cbd.name}</option>
                          ))}
                  </select>
                    {errors.CBD && (
                      <p className="text-red-500 text-sm mt-2">
                Select a THC POTENCY
                      </p>
                    )}
                  </div>
              </form>    
            )}
            <hr/>
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
            {!openNav &&  <FilteredProducts products={products} /> }
        </div>
      </div>
    </div>
  );
};

export default SidebarCat;
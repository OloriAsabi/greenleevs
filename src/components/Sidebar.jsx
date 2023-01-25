/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import { BsToggle2Off, BsToggle2On } from 'react-icons/bs';
import {RiArrowDropDownLine } from 'react-icons/ri';
import { FilterProducts, GetBrands } from '../apis/api';
import { plant_type } from '../data/data';
import GridStyle from './GridStyle';

const Sidebar = ({id}) => {
  const [plant, setPlant] = useState('');
  const [brand, setBrand] = useState('');
  const [potency, setPotency] = useState('');
  const [outOfStock, setOutOfStock] = useState(false);
  const [products, setProducts] = useState([]);

  const [toggleBtn, setToggleBtn] = useState(false);
  const [brands, setBrands] = useState([]);

  const [openBrand, setOpenBrand] = useState(false);
  const [openPlant, setOpenPlant] = useState(false);

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

  useEffect(() => {
    getBrands();
    },[]);
  
  
    const handleFilterSubmit = async (e) => {
      e.preventDefault();
      setOutOfStock(toggleBtn)
       await FilterProducts(id, plant, brand, potency, outOfStock)
      .then((res) => {
        if (res.status === 'success') {
          const data = res.data
          console.log("response", res)
          setProducts(data);
        }else{
          console.log(res.statusText);
        }
      }
      );
  }
  console.log(products);
  return (
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
    <form onSubmit={handleFilterSubmit}>
          <div className='pt-6'>
                  <div className='flex justify-between'>
                  <p className='pb-5'>BRANDS</p>
                  <button
                      className=''
                      onClick={() => setOpenBrand(!openBrand)}>
                      <RiArrowDropDownLine fontSize={28}/>
                    </button>
                  </div>
                  {openBrand && (
                  <div className='flex flex-col justify-between space-y-5 items-start'>
                  {brands.map((brand) => (
                    <div  className='flex mb-5' key={brand.id}>
                  <input id={brand.id} 
                    type="checkbox" 
                    name={brand.label} 
                    value={brand} 
                    onChange={(e) => setBrand(e.target.value)}
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                    aria-labelledby={brand.label} 
                    aria-describedby={brand.label} /> 
                    <label htmlFor={brand.label} className="text-sm text-[#2D2D2D] ml-2 block">
                      {brand.label}
                      </label>
                      </div>
                  ))}
                    </div>
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
                            onChange={(e) => setPlant(e.target.value)} />             
                      <label htmlFor={item.type}  className="text-sm text-[#2D2D2D] ml-2 block">
                        {item.type} 
                      </label>
                      </div>
                      ))}               
                  </div>
              )}
              <hr/>
          </div>
          <div className='flex flex-col pt-5 w-full'>
                 <select name="potency" onChange={(e) => setPotency(e.target.value)}>
                     <option value="">Select Potency</option>
                     <option value="low">Low</option>
                     <option value="medium">Medium</option>
                     <option value="high">High</option>
                 </select>
          </div>      

            <div className='flex justify-between pt-5 pb-5'>
              <p className='pb-5 text-[#2D2D2D] text-sm'>Out of Stock</p>
              <button onClick={() => setToggleBtn(!toggleBtn)}>
                {toggleBtn ?  
                  <BsToggle2On fontSize={28} className="cursor-pointer text-[#1F451A]"/> 
                  :
                  <BsToggle2Off fontSize={28} className="cursor-pointer text-[#1F451A]"/> 
                }
              </button>  
              </div>

            <button type="submit" className=''>Filter</button>
            {/* const products = filteredProducts.length > 0 ? filteredProducts : category; */}

            <div>
              <GridStyle filteredProducts={products}/>
            </div>
      </form>
      </div>
  );
};

export default Sidebar;
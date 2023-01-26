/* eslint-disable */
import React, {useState} from 'react';
import logo from '../assests/logo.png';
import {  NavLink } from 'react-router-dom';
import { links } from '../data/data';
import { GrFormSearch } from 'react-icons/gr';
import { TbChevronRight } from 'react-icons/tb';
import { FaTimes } from 'react-icons/fa';
import { CgMenuRight } from 'react-icons/cg';
import {BsCart, BsSearch} from 'react-icons/bs';

import navpic from '../assests/Rectangle 131.png';
import { useStateContext } from '../contexts/ContextProvider';
import { SearchModal } from '../pages';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { GetSearchParams } from '../apis/api';

const Navbar = () => {

  const [navbar, setNavbar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const { state } = useStateContext();
  const { cart } = state;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { enqueueSnackbar } = useSnackbar();
 
  const submitHandler = async (data) => {
    const searchWord = data.search
    setWordEntered(searchWord);
    try {
      GetSearchParams(searchWord).then((response) => {
        if (response.status === 200) {
          const data = response.data.data
          
          const newFilter = data.products.filter((value) => {
            return value.label.toLowerCase().includes(searchWord.toLowerCase());
          })
          if (searchWord === "") {
            setFilteredData([]);
          } else {
            setFilteredData(newFilter);
          }
        }else{
          enqueueSnackbar(response.statusText, { variant: response.status });
        }       
      });
    } catch (error) {
      console.log(error);
    }
  }

  const activeLink = 'flex cursor-pointer items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const normalLink = 'flex cursor-pointer items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-slate-300 dark:text-gray-200 dark:hover:text-black hover:scale-x-105 m-2';

  return (
    <div>
      <nav
        className="flex items-center justify-between flex-wrap bg-[#1F451A] py-4 lg:px-12 shadow ">
        <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 lg:pb-0">
            <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
            <a href="/">
              <img 
                className="object-cover  w-24 h-40  dark:text-black text-white dark:bg-white rounded-none cursor-pointer"
                src={logo}
                alt='logo'
              />
            </a>
            </div>
            <div className="block text-white lg:hidden ">
            <div>
            {!navbar && (
              <div className='flex justify-bewteen gap-10 mr-5  mt-10 items-center'>
                <BsSearch fontSize={28} className="text-white marker:md:hidden cursor-pointer" onClick={() => setShowModal(true)}/>
                {showModal ? (<SearchModal/>) : null}
                <div className=''>
                  <a href='/carts' className='' >
                    <button className='bg-white font-bold text-[#1F451A] marker:md:hidden rounded-full p-3 cursor-pointer'>
                      <BsCart fontSize={28} /> 
                    </button>
                  </a>
                </div>
                <CgMenuRight fontSize={28} className="text-white marker:md:hidden cursor-pointer dark:text-white" onClick={() => setNavbar(true)} />
              </div>        
            )}
            {navbar && (
              <div className='flex justify-bewteen gap-10 mr-5 mt-10 items-center'>
                <BsSearch fontSize={28} className="text-white marker:md:hidden cursor-pointer"/>
                <div className=''>
                  <a href='/carts' className='' >
                    <button className='bg-white font-bold text-[#1F451A] marker:md:hidden rounded-full p-3 cursor-pointer'>
                      <BsCart fontSize={28} /> 
                    </button>
                  </a>
                </div>
                <FaTimes fontSize={28} className="text-white  cursor-pointer font-light" onClick={() => setNavbar(false)} />  
              </div>    
            )}
          </div>
            </div>
        </div>
    
        <div className="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
          {!navbar && (
            <div className='lg:flex hidden'>
             {links.map((link) => (
              <div key={link.id} className="">
                <NavLink
                  // eslint-disable-next-line no-useless-concat
                  to={`/${link.link}`}
                  key={link.id}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '' : '',
                  })}
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                >
                  {link.icon}
                  <span className="capitalize text-xl whitespace-nowrap" >{link.name}</span>
                </NavLink>
        
              </div>
            ))}
            </div>
          )}
          {navbar && (
                <div
                className={`w-full h-full  p-10 ease-in-out duration-300  lg:hidden md:hidden  bg-[#1F451A] pb-10 md:block  ${
                  navbar ? 'block translate-x-0\'' : 'hidden translate-x-full'
                }`}
              > 
                {navbar && (
                <div className=' md:hidden text-white cursor-pointer fixed top-4 right-4 font-light'>
                        {/* <FaTimes fontSize={28} className=" md:hidden" onClick={() => setNavbar(false)} />   */}
                    </div>    
                )}
                <ul className="text-white md:hidden pt-5 small list-none flex-col">
                  <li className='mx-4 cursor-pointer text-xl  hover:border-b-2  capitalize p-3 my-2'>
                    <a href="/user/orders" className='flex justify-between  capitalize'>MY ACCOUNT<TbChevronRight fontSize={28} className='text-end ' /></a>
                  </li>
                  <li className='mx-4 cursor-pointer text-xl  p-3  hover:border-b-2 capitalize  dark:text-white my-2'>
                    <a href="/specialmenu" className='flex justify-between  capitalize'>SPECIALMENU <TbChevronRight fontSize={28} className='text-end' /></a>
                  </li>
                  <li className='mx-4 cursor-pointer text-xl  p-3 capitalize  dark:text-white my-2'>
                    <a href="/shop" className='flex justify-between  capitalize'>SHOP <TbChevronRight fontSize={28} className='text-end' /></a>
                  </li>
                  <li className='mx-4 cursor-pointer text-xl  p-3 capitalize hover:border-b-2 dark:text-white my-2'>
                    <a href="/" className='flex justify-between  capitalize '>TINCTURES <TbChevronRight fontSize={28} className='text-end ' /></a>
                  </li>
                  <li className='mx-4 cursor-pointer text-xl  p-3 capitalize hover:border-b-2 dark:text-white my-2'>
                    <a href="/" className='flex justify-between  capitalize'>EDIBLES <TbChevronRight fontSize={28} className='text-end ' /></a>
                  </li>
                  <li className='mx-4 cursor-pointer text-xl  p-3 capitalize hover:border-b-2 dark:text-white my-2'>
                    <a href="/" className='flex justify-between  capitalize'>TROPICALS <TbChevronRight fontSize={28} className='text-end ' /></a>
                  </li>
                  <li className='mx-4 cursor-pointer text-xl  p-3 capitalize hover:border-b-2 dark:text-white my-2'>
                    <a href="/" className='flex justify-between  capitalize'>ACCESSORIES <TbChevronRight fontSize={28} className='text-end ' /></a>
                  </li>
                  <li className='mx-4 cursor-pointer text-xl capitalize  p-3 hover:border-b-2 dark:text-white my-2'>
                    <a href="/" className='flex justify-between  capitalize'>EXTRACTS <TbChevronRight fontSize={28} className='text-end ' /></a>
                  </li>
                  <li className='mx-4 cursor-pointer text-xl  p-3 hover:border-b-2 dark:text-white my-2'>
                    <a href="/" className='flex justify-between  capitalize'>LEARN <TbChevronRight fontSize={28} className='text-end ' /></a>
                  </li>
                </ul>
      
                <div className='text-center flex flex-col small md:hidden items-center space-y-5 pt-5 font-normal'>
                  <p className='text-white'>Not Sure What you’re Looking For?</p>
                  <img src={navpic} alt='Nav' className='w-72 h-48 rounded'/>
                  <button className='bg-transparent text-center hover:scale-x-110 cursor-pointer border border-white text-white rounded gap-2 p-3 w-48'>
                      Shop with us
                  </button>
                </div>
              </div>   
          )}
       
            <form className="relative mx-auto inline-flex flex-col text-gray-600 lg:block hidden" onSubmit={handleSubmit(submitHandler)} b>
              <div className="relative">
                <input
                    className="border placeholder-blueGray-300 relative h-10 pl-2 pr-8 bg-white text-[#1F451A] rounded-xl text-sm shadow focus:border-gray-200 border-gray-200  focus:outline-none focus:bg-white cursor-pointer w-full "
                    type="search" 
                    name="search" 
                    placeholder='What are you looking for?'
                    {...register('search')}
                    />
                <button type="submit" className="absolute text-white right-0 top-0 mt-3 mr-2" onClick={() => setShowModal(true)}>
                <GrFormSearch fontSize={38}  className="fill-current h-4 w-4"  onClick={() => setShowModal(true)}/>
                </button>
                </div>            
              <div className='absolute'>
              {showModal ? (
              <ul className="bg-white border border-gray-100 p-5 rounded-md w-[30vw] mt-2">
             <h3 className="mt-2 text-xl text-[#1F451A]">{wordEntered}</h3>
              {filteredData.length != 0 && (  
                <div>
                  <FaTimes fontSize={28} className="text-[#1F451A] cursor-pointer font-light" onClick={() => setShowModal(false)} />  
                  {filteredData.slice(0, 15).map((value) => {
                  return (
                    <div key={value.product_id} className='flex justify-between px-10 py-10'>
                    <img src={value.product_image} alt="product image" className="stroke-current absolute w-12 h-12 left-2 " />
                    <a className="" href={`/product/${value.slug}`}>
                    <b>{value.label}</b>
                    </a>
                    </div>
                  );
                })}
               </div>
              )}  
              </ul>
              ) : 
              null}
            </div>
            </form>
           
            <div className="lg:flex hidden">
                <a href="/user/orders"
                   className="block text-md px-4 py-5 active:text-[#ededed] hover:scale-x-105 cursor-pointer rounded text-white  ml-2 font-bold hover:text-[#ededed] mt-4 lg:mt-0">
                       Account
                </a>
    
                <a href="/carts"
                   className=" block text-md px-4  ml-2 py-2 rounded text-white font-bold cursor-pointer hover:scale-x-105 hover:text-[#ededed]  lg:mt-0">
                     {/* <button className='flex bg-white text-[#1F451A] rounded gap-2 p-3 w-24'>
                    <BsCart fontSize={28}/> Cart
                  </button> */}
                    <span className="relative inline-block">
                    <button className='flex bg-white text-[#1F451A] rounded gap-2 p-3 w-24'>
                    <BsCart fontSize={28}/> Cart
                  </button>
                  {cart.cartItems.length > 0 ? (
                    <span
                    className="absolute top-0 right-0 px-2 py-1 font-bold text-xs leading-none text-red-100 transform bg-red-600 rounded-full">
                      {cart.cartItems.length}
                    </span>
                    ) : (
                      ''
                    )}
                  </span>
                   </a>
            </div>           
        </div>
    </nav>

    </div>
  );
};

export default Navbar;
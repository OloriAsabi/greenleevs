/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import logo from '../assests/green (4) 2.png';
import { LogoutUser } from '../apis/api';
import { IoMdLogIn } from 'react-icons/io';
import { BiMenu, BiMenuAltRight } from 'react-icons/bi';
import { UserSideBar } from '../components';

import visa from '../assests/Vector (1).png';
import master from '../assests/master.png';
import american from '../assests/american.png';

import { AiOutlineSetting } from 'react-icons/ai';
import { FaCubes } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';


const UserProfile = () => {
  const { state } = useStateContext();
  const { user } = state;
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);

  const menus = [
    { 
    id: 'orders', 
    title: 'Orders', 
    icon: <FaCubes/>,
   },
    { id: 'shipping', title: 'Shipping', icon: <GrLocation/>},
    { id: 'settings', title: 'Settings', icon: <AiOutlineSetting/>},
  ];
  
  useEffect(() => {
    if(!user) {
      navigate("/login")
    }
  }, [navigate, user]);

  const logout = () => {
    LogoutUser();
    localStorage.clear();

    navigate('/login');
  };

  return (
    <div>
      <div className='flex gap-10'>
        <div
          className="w-56 accessorySide
      bg-white  h-full p-5 pt-8 relative duration-300"
        >
          <div 
            className='w-56 h-auto bg-white p-10 rounded-lg border hover:shadow-md'>
            <div className="block">
              <img
                src={logo}
                alt='logo'
                className={'cursor-pointer w-24  '}
              />
            </div>
            <ul className="pt-6">
            {menus.map((menu) => (
              <li key={menu.id}>
                <Link 
                className={`flex rounded-md p-2 cursor-pointer text-[#2D2D2D] hover:bg-[#1F451A] hover:text-white active:text-[#1F451A] text- text-sm items-center gap-x-4 
                mt-2`}
                to={menu.id}
                >
                   <div>{menu.icon}</div>
                    <span className={'origin-left duration-200'}>
                    {menu.title}
                    </span>          
                </Link>
              </li>
              ))}
              <li 
                className={`flex rounded-md p-2 cursor-pointer text-red-500 hover:bg-[#1F451A] active:text-[#1F451A] text- text-sm items-center gap-x-4 
            mt-2`}
                onClick={(e) => logout(e)}>
                <IoMdLogIn className='text-red-500' /> 
                <a href="/" className="">
                Logout </a>
              </li>
            </ul>
          </div>
          </div>

          <div className='h-full flex-1'>
          <div className='text-end m-5'>
          <button
                className='rounded bg-[#c9e7c5] accessorySide md:hidden hover:scale-x-110 p-3 cursor-pointer'
                onClick={() => setOpenNav(!openNav)}>
                <BiMenu fontSize={28} className=""/>
              </button>
              {!openNav ? (
                <button
                  className='rounded bg-[#c9e7c5] dontShow hover:scale-x-110  p-3  cursor-pointer'
                  onClick={() => setOpenNav(!openNav)}>
                  <BiMenuAltRight className='' fontSize={28}/>
                </button>
              ):(
                <div className={`top-0 right-0 fixed bg-white w-full h-full p-10' ${openNav ? 'translate-x-0' : 'translate-x-full'} ease-in-out duration-300`}>
                  <UserSideBar setOpenNav={setOpenNav}/>
                </div>
              )}
              </div>
            <Outlet/>           
        </div>
      </div>
      <div className='w-screen text-center tracking-widest leading-8 p-20 mt-10 mb-10 shopBg h-full '>
        <div className='text-center flex flex-col items-center small justify-center text-white p-5'>
          <h3 className='font-bold text-3xl pb-10'>Not Sure What You’re Looking For?</h3>
          <button className='bg-transpent hover:scale-x-110 border border-white text-white p-3 cursor-pointer rounded-md w-72 font-normal text-2xl'>USE OUR GUIDE</button>
        </div>
      </div>

      <div className='w-screen text-center tracking-widest leading-8 p-20 mt-10 mb-10 bg-white h-full '>
        <h3 className='text-[#1F451A] text-3xl small font-semibold'>Payment Methods</h3>
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

export default UserProfile;
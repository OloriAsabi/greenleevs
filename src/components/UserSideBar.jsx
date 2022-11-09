import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { FaCubes } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { IoMdLogIn } from 'react-icons/io';
import { LogoutUser } from '../apis/api';
import { useNavigate } from 'react-router-dom';

/* eslint-disable */

const UserSideBar = ({setOpenNav}) => {
    const history = useNavigate();
    const logout = () => {
        LogoutUser();
        localStorage.clear();
    
        navigate('/login');
      };
  return (
    <div>
    <FaTimes fontSize={28} className="text-[#2D2D2D] cursor-pointer fixed top-4 right-4 font-light" onClick={() => setOpenNav(false)} /> 

    <div className='fixed w-full top-20 p-10 '>
    <div className='w-full  space-y-10'>
    <ul className="pt-6 text-xl">
    <li
                >
                  <div
                    className={`flex rounded-md p-2 cursor-pointer text-[#2D2D2D] hover:bg-[#1F451A] hover:text-white active:text-[#1F451A] text- text-sm items-center gap-x-4 
                     mt-2`}
                     onClick={() => history('/')}
                     >
                    <div><AiOutlineHome fontSize={28}/></div>
                    <span className={'origin-left duration-200 text-xl'}>
                    Home
                    </span>
          
                  </div>
                </li>
                <li
                >
                  <div
                    className={`flex rounded-md p-2 cursor-pointer text-[#2D2D2D] hover:bg-[#1F451A] hover:text-white active:text-[#1F451A] text- text-sm items-center gap-x-4 
                     mt-2`}
                    //  onClick={() => setOpenOrders(!openOrders)}
                     >
                    <div><FaCubes fontSize={28}/></div>
                    <span className={'origin-left duration-200 text-xl'}>
                    Orders
                    </span>
                  </div>
                </li>
                <li
                >
                  <div
                    className={`flex rounded-md p-2 cursor-pointer text-[#2D2D2D] hover:bg-[#1F451A] hover:text-white active:text-[#1F451A] text- text-sm items-center gap-x-4 
                     mt-2`}
                    //  onClick={() => setOpenShipping(!openShipping)}
                     >
                    <div><GrLocation  fontSize={28}/></div>
                    <span className={'origin-left duration-200 text-xl'}>
                    Shipping
                    </span>
          
                  </div>
                </li>
                <li
                >
                  <div
                    className={`flex rounded-md p-2 cursor-pointer text-[#2D2D2D] hover:bg-[#1F451A] hover:text-white active:text-[#1F451A] text- text-sm items-center gap-x-4 
                     mt-2`}
                    //  onClick={() => setOpenSettings(!openSettings)}
                     >
                    <div><AiOutlineSetting  fontSize={28}/></div>
                    <span className={'origin-left duration-200 text-xl'}>
                    Settings
                    </span>
          
                  </div>
                </li>
              <li 
                className={`flex rounded-md p-2 cursor-pointer text-red-500 hover:bg-[#1F451A] active:text-[#1F451A] text- text-sm items-center gap-x-4 
            mt-2`}
                onClick={(e) => logout(e)}>
                <IoMdLogIn className='text-red-500'  fontSize={28} /> 
                <a href="/" className="text-xl">
                Logout </a>
              </li>
            </ul>
    </div>
     </div>
    </div>
  )
}

export default UserSideBar
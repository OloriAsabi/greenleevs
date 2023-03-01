import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { FaCubes } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { IoMdLogIn } from 'react-icons/io';
import { LogoutUser } from '../apis/api';
import { Link, redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/auth';

// eslint-disable-next-line react/prop-types
const UserSideBar = ({ setOpenNav }) => {
  const dispatch = useDispatch();


    const logoutUser = () => {
      LogoutUser()
      dispatch(logout())

      redirect('/')
     };
     
      const menus = [
        {id: "/", title: "Home", icon:<AiOutlineHome fontSize={28}/> },
        { 
        id: 'orders', 
        title: 'Orders', 
        icon: <FaCubes  fontSize={28}/>,
       },
        { id: 'shipping', title: 'Shipping', icon: <GrLocation  fontSize={28}/>},
        { id: 'settings', title: 'Settings', icon: <AiOutlineSetting  fontSize={28}/>},
      ];

  return (
    <div className=''>
    <FaTimes fontSize={28} className="text-[#2D2D2D] cursor-pointer fixed top-4 right-4 font-light" onClick={() => setOpenNav(false)} /> 

    <div className='fixed w-full z-100 top-20  p-10 '>
    <div className='w-full  space-y-10'>
    <ul className="pt-6 text-xl">
                {menus.map((menu) => (
              <li 
              key={menu.id}
              onClick={() => setOpenNav(false)} 
              >
                <Link 
                className={`flex rounded-md p-2 cursor-pointer text-[#2D2D2D] hover:bg-[#1F451A] hover:text-white active:text-[#1F451A] text- text-sm items-center gap-x-4 
                mt-2`}
                to={menu.id}
                >
                   <div>{menu.icon}</div>
                    <span className={'origin-left duration-200  text-xl'}>
                    {menu.title}
                    </span>          
                </Link>
              </li>
              ))}
              <li 
                className='flex rounded-md p-2 cursor-pointer text-red-500 hover:bg-[#1F451A] active:text-[#1F451A] text- text-sm items-center gap-x-4 
            mt-2'
               >
                <IoMdLogIn className='text-red-500'  fontSize={28} /> 
                <button  className="text-xl"  onClick={() => logoutUser()}>
                Logout </button>
              </li>
            </ul>
    </div>
     </div>
    </div>
  )
}

export default UserSideBar 
import React from 'react'
import { Link, NavLink, redirect } from 'react-router-dom';
import { links } from '../data/data';
import { IoIosLogOut } from "react-icons/io";
import logo from "../data/logo.png"
import { LogoutUser } from '../apis/api';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setActiveMenu } from '../reducers/auth';

const Sidebar = () => {
  const { activeMenu, screenSize } = useSelector(state => state.auth);
  const dispatch = useDispatch();

    const handleCloseSideBar = () => {
        if (activeMenu !== undefined && screenSize <= 900) {
          dispatch(setActiveMenu(false));
        }
      }

      const logoutUser = () => {
       LogoutUser()
       dispatch(logout())
       redirect('/login')
      };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg bg-[#14532d] text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 text-[#14532d] bg-white rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 small-nav mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
            <img src={logo} alt="Logo" className='w-20 h-24 rounded' />
            </Link>
          </div>
          <div className="mt-10">
            {links.map((item, index) => (
              <div key={index}>
                <p className="text-gray-400 dark:text-gray-400 m-3 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    key={link.id}
                    to={`/${link.href}`}
                    onClick={handleCloseSideBar}
                 className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize active:bg-slate-600" >{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        
        <div className="mt-5 ml-2">
            <button 
            className="bg-[#1F451A] text-white hover: cursor-pointer p-4 rounded" 
            onClick={(e) => logoutUser(e)}>
                <div className="flex gap-2 font-normal text-xl">
                <IoIosLogOut fontSize={28}/> 
                Logout </div>
            </button>
        </div>
        </>
      )}
    </div>
  )
}

export default Sidebar
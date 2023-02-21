import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenu, setScreenSize } from '../reducers/auth';


const NavButton = ({ title, customFunc, icon, dotColor }) => (
    <div content={title} position="BottomCenter">
      <button
        type="button"
        onClick={() => customFunc()}
        className="relative text-xl text-black rounded-full p-3 hover:bg-light-gray"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </div>
  );
  

const Navbar = ({userInfo}) => {
    const { activeMenu, screenSize, users } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate()
    useEffect(() => {
        const handleResize = () => dispatch(setScreenSize(window.innerWidth));
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => window.removeEventListener('resize', handleResize);
      }, [dispatch]);
    
      useEffect(() => {
        if (screenSize <= 900) {
          dispatch(setActiveMenu(false))
        } else {
          dispatch(setActiveMenu(true))
        }
      }, [dispatch, screenSize]);
    
      useEffect(() => {
        if(!users) {
          navigate("/login")
        }
      }, [navigate, users]);
    

      const handleActiveMenu = () => dispatch(setActiveMenu(!activeMenu));

  return (
    <div className="flex justify-between border-b-2 p-3 md:ml-6 md:mr-6 relative">

    <NavButton title="Menu" customFunc={handleActiveMenu}  icon={<AiOutlineMenu />} />
    <div className="flex justify-between space-x-10">
      <div 
      content="Profile" 
      position="BottomCenter"
      className='mt-5'
      >
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
        >
          {userInfo &&
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{'  '}
              <span className="text-gray-500 text-sm font-semibold dark:text-gray-400">
               {userInfo.email}
              </span>
            </p>
          }
        </div>
      </div>
    </div>
  </div>
  )
}

export default Navbar
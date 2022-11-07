import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';
import { Notifications, UserProfile } from '.';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { useStateContext } from '../contexts/ContextProvider';

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
    const { activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => window.removeEventListener('resize', handleResize);
      }, [setScreenSize]);
    
      useEffect(() => {
        if (screenSize <= 900) {
          setActiveMenu(false);
        } else {
          setActiveMenu(true);
        }
      }, [screenSize, setActiveMenu]);

      const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between border-b-2 p-3 md:ml-6 md:mr-6 relative">

    <NavButton title="Menu" customFunc={handleActiveMenu}  icon={<AiOutlineMenu />} />
    <div className="flex">
      <NavButton title="Notification" dotColor="rgb(212, 15, 15)" customFunc={() => handleClick('notification')} color="black" icon={<RiNotification3Line />} />
      <div content="Profile" position="BottomCenter">
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          onClick={() => handleClick('userProfile')}
        >
          {userInfo &&
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
               {userInfo.username}
              </span>
            </p>
          }
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
        </div>
      </div>

      {isClicked.notification && (<Notifications />)}
      {isClicked.userProfile && (<UserProfile userInfo={userInfo} />)}
    </div>
  </div>
  )
}

export default Navbar
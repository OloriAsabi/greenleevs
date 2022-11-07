import React, {useState} from 'react'
import logo from '../assests/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { links } from '../data/data';
// import { GrFormSearch } from 'react-icons/gr';
import { TbChevronRight } from 'react-icons/tb';
import { FaTimes } from "react-icons/fa"
import { CgMenuRight } from 'react-icons/cg'
import {BsCart, BsSearch} from 'react-icons/bs'

import navpic from '../assests/Rectangle 131.png'

// const Nav = () => {
//   const [navbar, setNavbar] = useState(false);
  
//   return(
//   <nav className='w-full  bg-[#1F451A] h-32 flex dark:text-white dark:bg-white justify-between items-center p-4 shadow-black'>
//   <div className="flex justify-center  items-center">
//       <a href="/">
//       <img 
//       className=" flex-start object-cover w-32 h-24  dark:text-black text-white dark:bg-white rounded-none cursor-pointer"
//       src={logo}
//       alt='logo'
//       />
//       </a>
//     </div>
//     {/* <div className="text-white flex space-x-10 md:flex hidden list-none dark:text-black flex-row justify-between items-center">
//     {links.map((link) => (
//             <div key={link.id}>
//                 <NavLink
//                   // eslint-disable-next-line no-useless-concat
//                   to={`/${link.name}`}
//                   key={link.id}
//                   style={({ isActive }) => ({
//                     backgroundColor: isActive ? '' : '',
//                   })}
//                   className={({ isActive }) => (isActive ? activeLink : normalLink)}
//                 >
//                   {link.icon}
//                   <span className="capitalize text-xl whitespace-nowrap" >{link.name}</span>
//                 </NavLink>
    
//             </div>
//           ))}
//     </div> */}
//     <div className='w-auto ml-20 items-center homeBg md:flex hidden '>
//     <span className='flex w-72 justify-between items-center pt-10 pb-10 '>
//      {/* <GrFormSearch fontSize={38} color="white" className='fixed text-center text-white mt-3 ml-3 min-w-40'/> */}
//       <input
//         className='w-full rounded-xl border p-4 text-[#1F451A] bg-[#1F451A]  px-3 py-1 text-sm focus:outline-none leading-5  focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A]  h-12 focus:bg-white cursor-pointer' 
//         type="search"  
//         placeholder='What are you looking for ?'
//       />
//     </span>
//     </div>
//     <ul className="text-white flex space-x-9 md:flex hidden  list-none flex-row justify-between items-center">
//     <li className='mx-4 active:text-[#ededed] hover:scale-x-105 cursor-pointer my-2 text-lg'>
//             <a  href='/user' >
//               Account
//            </a>
//             </li>   
//             <li className='mx-4 active:text-[#ededed] hover:scale-x-105 cursor-pointer my-2 text-lg'>
//             <a  href='/carts' className='' >
//               <button className='flex bg-white text-[#1F451A] rounded gap-2 p-3 w-24'>
//               <BsCart fontSize={28}/> Cart
//               </button>
//            </a>
//       </li>   
//       </ul>

//       <div className="flex relative justify-between items-center ">      
//       <div className='flex md:hidden justify-bewteen gap-10 items-center'>
//       <BsSearch fontSize={38} className="text-white marker:md:hidden cursor-pointer"/>
//         <div className=''>
//         <a  href='/carts' className='' >
//           <button className='bg-white font-bold text-[#1F451A] marker:md:hidden rounded-full p-3 cursor-pointer'>
//             <BsCart fontSize={28} /> 
//           </button>
//            </a>
//         </div>
//         </div>
//       {!navbar && (
//         <CgMenuRight fontSize={38} className="text-white  ml-5  md:hidden marker:md:hidden cursor-pointer dark:text-white" onClick={() => setNavbar(true)} />
//       )}
      
//       {navbar && (
//           <FaTimes fontSize={38} className="text-white  ml-5  md:hidden cursor-pointer" onClick={() => setNavbar(false)} />  
//         // <CgMenuRight fontSize={38} className="text-white  ml-5  md:hidden cursor-pointer dark:text-white" onClick={() => setNavbar(false)} />
//       )}   
     
//       {navbar && (
//           <div
//           className="fixed top-28  right-0 bg-white ease-in p-3 shadow-2xl list-none rounded-md text-black w-screen h-screen">
//            {/* <GiCancel fontSize={38} className=" mr-60 text-[#2D2D2D] md:hidden cursor-pointer text-end" onClick={() => setNavbar(false)} />   */}
//          <ul className="text-[#2D2D2D] list-none flex-col">
//             <li className='mx-4 cursor-pointer text-2xl p-3 my-2'>
//               <a href="/user" className='flex justify-between '>MY ACCOUNT<TbChevronRight fontSize={38} className='text-end ' /></a>
//               </li>
//             <li className='mx-4 cursor-pointer text-2xl  p-3  dark:text-white my-2'>
//             <a href="/specialmenu" className='flex justify-between '>SPECIAL MENU <TbChevronRight fontSize={38} className='text-end' /></a>
//               </li>
//             <li className='mx-4 cursor-pointer text-2xl  p-3  dark:text-white my-2'>
//             <a href="/shop" className='flex justify-between '>SHOP <TbChevronRight fontSize={38} className='text-end' /></a>
//               </li>
//             <li className='mx-4 cursor-pointer text-2xl  p-3  dark:text-white my-2'>
//             <a href="/" className='flex justify-between '>TINCTURES <TbChevronRight fontSize={38} className='text-end ' /></a>
//               </li>
//             <li className='mx-4 cursor-pointer text-2xl  p-3  dark:text-white my-2'>
//             <a href="/" className='flex justify-between '>EDIBLES <TbChevronRight fontSize={38} className='text-end ' /></a>
//               </li>
//             <li className='mx-4 cursor-pointer text-2xl  p-3  dark:text-white my-2'>
//             <a href="/" className='flex justify-between '>TROPICALS <TbChevronRight fontSize={38} className='text-end ' /></a>
//               </li>
//               <li className='mx-4 cursor-pointer text-2xl  p-3  dark:text-white my-2'>
//             <a href="/" className='flex justify-between '>ACCESSORIES <TbChevronRight fontSize={38} className='text-end ' /></a>
//               </li>
//               <li className='mx-4 cursor-pointer text-2xl  p-3  dark:text-white my-2'>
//             <a href="/" className='flex justify-between '>EXTRACTS <TbChevronRight fontSize={38} className='text-end ' /></a>
//               </li>
//               <li className='mx-4 cursor-pointer text-2xl  p-3  dark:text-white my-2'>
//             <a href="/" className='flex justify-between '>LEARN <TbChevronRight fontSize={38} className='text-end ' /></a>
//               </li>
//         </ul>
//         <div className='text-center flex flex-col items-center space-y-5 pt-5 font-normal'>
//           <p>Not Sure What you’re Looking For?</p>
//           <img src={navpic} alt='Nav' className='w-auto h-auto rounded'/>
//           <button className='bg-transparent text-center cursor-pointer border border-[#1F451A] text-[#1F451A] rounded gap-2 p-3 w-48'>
//              Shop with us
//               </button>
//         </div>
//         </div>
//       )}
//     </div>
//   </nav> 
//   )
// }



const Navbar = () => {

  const [navbar, setNavbar] = useState(false);

    const activeLink = 'flex cursor-pointer items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
    const normalLink = 'flex cursor-pointer items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-slate-300 dark:text-gray-200 dark:hover:text-black hover:scale-x-105 m-2';

  return (
    <div>
    <nav className="w-full relative small bg-[#1F451A] shadow">
    <div className="flex flex-row  pl-3 pr-3 justify-between items-center">
        <div className="flex justify-start items-start">
          <a href="/">
          <img 
          className=" flex-start object-cover  w-24 h-24  dark:text-black text-white dark:bg-white rounded-none cursor-pointer"
          src={logo}
          alt='logo'
          />
          </a>
        </div>
        <div className="text-white flex space-x-10 md:flex hidden list-none dark:text-black flex-row justify-between items-center">
        {links.map((link) => (
                <div key={link.id}>
                    <NavLink
                      // eslint-disable-next-line no-useless-concat
                      to={`/${link.name}`}
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
        <div className='w-auto ml-20 items-center homeBg md:flex hidden '>
      <span className='flex w-72 justify-between items-center pt-10 pb-10 '>
      {/* <GrFormSearch fontSize={38} color="white" className='fixed text-center text-white mt-3 ml-3 min-w-40'/> */}
        <input
          className='w-full rounded-xl border p-4 text-[#1F451A] bg-[#1F451A]  px-3 py-1 text-sm focus:outline-none leading-5  focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A]  h-12 focus:bg-white cursor-pointer' 
          type="search"  
          placeholder='What are you looking for ?'
        />
      </span>
      </div>
      
        <div>
        {!navbar && (
          <div className='flex md:hidden justify-bewteen gap-10 mr-5 items-center'>
          <BsSearch fontSize={28} className="text-white marker:md:hidden cursor-pointer"/>
            <div className=''>
            <a  href='/carts' className='' >
              <button className='bg-white font-bold text-[#1F451A] marker:md:hidden rounded-full p-3 cursor-pointer'>
                <BsCart fontSize={28} /> 
              </button>
              </a>
            </div>
            <CgMenuRight fontSize={28} className="text-white md:hidden marker:md:hidden cursor-pointer dark:text-white" onClick={() => setNavbar(true)} />
            </div>        
        )}
        {navbar && (
          <div className='flex md:hidden justify-bewteen gap-5 mr-5 items-center'>
          <BsSearch fontSize={28} className="text-white marker:md:hidden cursor-pointer"/>
            <div className=''>
            <a  href='/carts' className='' >
              <button className='bg-white font-bold text-[#1F451A] marker:md:hidden rounded-full p-3 cursor-pointer'>
                <BsCart fontSize={28} /> 
              </button>
              </a>
            </div>
                  <FaTimes fontSize={28} className="text-white  md:hidden cursor-pointer font-light" onClick={() => setNavbar(false)} />  
              </div>    
          )}
        </div>
        <div className="hidden space-x-2 md:inline-block">
        <ul className="text-white mr-5 flex space-x-9 md:flex hidden  list-none flex-row justify-between items-center">
      <li className='mx-4 active:text-[#ededed] hover:scale-x-105 cursor-pointer my-2 text-lg'>
              <a  href='/user' >
                Account
            </a>
              </li>   
              <li className='mx-4 active:text-[#ededed] hover:scale-x-105 cursor-pointer my-2 text-lg'>
              <a  href='/carts' className='' >
                <button className='flex bg-white text-[#1F451A] rounded gap-2 p-3 w-24'>
                <BsCart fontSize={28}/> Cart
                </button>
            </a>
        </li>   
        </ul>
        </div>
    </div>
    <div
        className={`right-0 -top-0 relative w-full h-full  p-10 ease-in-out duration-300  lg:hidden md:hidden  bg-[#1F451A] pb-10 md:block  ${
                    navbar ? "block translate-x-0'" : "hidden translate-x-full"
          }`}
            > 
                {/* {navbar && (
          <div className=' md:hidden text-white cursor-pointer fixed top-4 right-4 font-light'>
                  <FaTimes fontSize={28} className=" md:hidden" onClick={() => setNavbar(false)} />  
              </div>    
          )} */}
                <ul className="text-white md:hidden pt-5 small list-none flex-col">
                <li className='mx-4 cursor-pointer text-xl  hover:border-b-2  capitalize p-3 my-2'>
                  <a href="/user" className='flex justify-between  capitalize'>MY ACCOUNT<TbChevronRight fontSize={28} className='text-end ' /></a>
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
    </nav>
    </div>
  )
}

export default Navbar
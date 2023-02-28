import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { GrFormSearch } from 'react-icons/gr';
import { FaTimes } from 'react-icons/fa';
import { CgMenuRight } from 'react-icons/cg';
import { BsCart, BsSearch } from 'react-icons/bs';
import { TbChevronRight } from 'react-icons/tb';
import { links } from '../data/data';
import { GetSearchParams } from '../apis/api';
import logo from '../assests/logo.png';

const Navbar = () => {
          const [navbar, setNavbar] = useState(false);
          const [showModal, setShowModal] = useState(false);
          const [filteredData, setFilteredData] = useState([]);
          const [wordEntered, setWordEntered] = useState('');
          const { cart } = useSelector(state => state.auth);

          const handleButtonClick = () => {
            setShowModal(!showModal);
          };

          const handleModalClose = () => {
            setShowModal(false);
          };

          const { register, handleSubmit } = useForm();

          const submitHandler = async data => {
            const searchWord = data.search;
            setWordEntered(searchWord);
            try {
              GetSearchParams(searchWord).then(response => {
                if (response.status === 200) {
                  const data = response.data.data;

                  const newFilter = data.products.filter(value => {
                    return value.label.toLowerCase().includes(searchWord.toLowerCase());
                  });
                  if (searchWord === '') {
                    setFilteredData([]);
                  } else {
                    setFilteredData(newFilter);
                  }
                } else {
                  toast.error(response.statusText);
                }
              });
            } catch (error) {
              toast.error(error);
            }
          };

          const activeLink = 'flex cursor-pointer items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
          const normalLink = 'flex cursor-pointer items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-slate-300 dark:text-gray-200 dark:hover:text-black hover:scale-x-105 m-2';

            const menuIcon = (
              <div className="block relative lg:hidden">
                <button
                  onClick={() => setNavbar(!navbar)}
                  className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
                >
                  <CgMenuRight size={30} />
                </button>
              </div>
            );

          const searchIcon = (
            <div className="relative lg:block hidden">
              <button className="flex items-center justify-center text-white" onClick={handleButtonClick}>
                <BsSearch fontSize={28} />
              </button>
              {showModal && (
                <div className="absolute top-20 -right-40 z-50">
                <form className="bg-white shadow-md w-[30rem] rounded-lg p-5" onSubmit={handleSubmit(submitHandler)}>
                  <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-gray-200">Search Products</h2>
                  <button type="button" onClick={handleModalClose}>
                  <FaTimes size={28} className="text-[#1F451A]" />
                  </button>
                  </div>
                  <div className="relative flex items-center">
                  <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-gray-100 rounded-lg text-[#1F451A] py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1F451A] focus:bg-white"
                  {...register('search')}
                  />
                  <button type="submit" className="absolute right-4">
                  <GrFormSearch size={20} />
                  </button>
                  </div>
                  <div className="mt-5">
                  {filteredData.length !== 0 && (
                  <div className="max-h-52 overflow-y-auto">
                  {filteredData.map((product, index) => (
                  <NavLink
                  key={index}
                  to={`/products/${product.id}`}
                  className="flex justify-between items-center hover:bg-gray-100 p-3 rounded-lg"
                  onClick={() => setShowModal(false)}
                  >
                  <img src={product.product_image} alt={product.label} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex flex-col flex-1 ml-4">
                  <span className="text-lg text-[#1F451A] font-semibold">{product.label}</span>
                  <span className="text-[#1F451A]">{product.description}</span>
                  </div>
                  <TbChevronRight size={24} />
                  </NavLink>
                  ))}
                  </div>
                  )}
                  {filteredData.length === 0 && wordEntered !== '' && (
                  <div className="text-lg font-medium text-gray-500 text-center mt-5">No Products Found</div>
                  )}
                  </div>
                  </form>
                  </div>
                  )}
                  </div>
              );

            const cartIcon = (
            <div className='flex justify-between items-center gap-16'>
            <NavLink to='/user/orders'
            className='block text-md p-3 active:text-[#ededed] hover:scale-x-105 cursor-pointer rounded text-[#1F451A] bg-white font-bold hover:text-[#ededed] lg:mt-0'>
              Account
            </NavLink>
            <NavLink to="/carts" className="flex items-center text-white">
            <span className="relative inline-block">
            <button className='flex bg-white items-center justify-center text-[#1F451A] cursor-pointer rounded gap-2 p-3 w-24'>
            <BsCart size={28}   />
            </button>
            {cart.cartItems.length > 0 ? (
            <span className="bg-red-600 text-white rounded-full h-5 w-5 flex justify-center items-center text-xs absolute top-0 right-5">
                      {cart.cartItems.length}
            </span>
            ): 
            ''
            }
            </span>
            </NavLink>
            </div>
            );

        return (
        <nav className="bg-[#1F451A] text-white">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-30 h-40" />
            </NavLink>
               <div className={`lg:flex items-center justify-between gap-40 ${navbar ? 'block ease-in-out z-50 w-full right-0 space-y-10 duration-300 top-36 px-8 py-10 bg-[#1F451A] absolute' : 'hidden'} pt-6 lg:pt-0`}>
               <div className="lg:flex lg:px-3">
                  {links.map((link, index) => (
                          <NavLink
                            key={index}
                            to={`/${link.link}`}
                            style={({ isActive }) => ({
                                              backgroundColor: isActive ? '' : '',
                                      })}
                            className={({ isActive }) => (isActive ? activeLink : normalLink)}
                            onClick={() => setNavbar(false)}
                          >
                            {link.icon}
                            <span className="capitalize text-xl whitespace-nowrap">{link.name}</span>
                          </NavLink>
                        ))}
                    </div>
                    {searchIcon}
                    {cartIcon}
                </div>
                {menuIcon}
              </div>
        </nav>
        )
    }
 export default Navbar;
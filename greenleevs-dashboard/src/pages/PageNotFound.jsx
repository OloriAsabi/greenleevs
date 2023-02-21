import React from 'react';
import logo from "../data/404.png"

const PageNotFound = () => {
  return (
    <div>
        <div className='object-cover bg-center bg-cover mt-20 ml-20'>
        <img src={logo} alt="" />
        </div>
        <h3 className='text-center text-2xl m-10'>Whoops, that page is Gone</h3>
        <p  className='text-center'>The link you clicked maybe broken or the page may have been removed. 
            but take a chill pill and we are on the go to fix this for you. Kindly navigate back to some of the pages on this screen that is provided below.
        </p>

        <button className='text-center cursor-pointer bg-[#1F451A] text-white m-10 p-4 rounded'><a href='/'>Home</a></button>
    </div>
  )
}

export default PageNotFound
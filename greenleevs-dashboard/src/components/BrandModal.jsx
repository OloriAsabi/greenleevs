import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { useSnackbar } from 'notistack';
import { useStateContext } from '../contexts/ContextProvider';
import { useForm } from 'react-hook-form';
import { PostBrand } from '../apis/api';


const BrandModal = ({toggleMenu, setToggleMenu}) => {
    const { dispatch  } = useStateContext();
    const navigate = useNavigate();

    const [file, setFile] = useState([]);
    const [image, setImage] = useState();

    console.log("Images: ",image);
    const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm();

  function uploadSingleFile(e) {
    const selectedFile = e.target.files[0];
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    console.log(ImagesArray);
    setFile([...file, ...ImagesArray]);
    setImage(URL.createObjectURL(selectedFile))
    console.log("file", file);
  }

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
    console.log(s);
  }

  const submitHandler = async (data) => {
    console.log("Brands Product Modal", data);
    const body = {
        label: data.title ,
        slug: data.slug,
        logo: image,
        description: data.description,
      };
      console.log('Body',body);
      try {
        PostBrand(body)
        .then(response => {
         console.log(response);
        //  const responseStatus = response.data.status
        //  if (responseStatus) {
        //    enqueueSnackbar('Categories Added Successfully', { variant: responseStatus });
        //  } else {
        //    enqueueSnackbar("Categories Upload failed" , { variant: responseStatus });
        //  }
       });
       dispatch({ type: 'ADD_BRANDS', payload: body});
       localStorage.setItem('brands', JSON.stringify(body));
       navigate('/brands');
     } catch (error) {
       console.log(error);
        
      }

  }

  return (
     <main
    className={
      " fixed overflow-hidden z-10 overflow-y-scroll bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
      ( toggleMenu
        ? " transition-opacity opacity-100 duration-500 translate-x-0  "
        : " transition-all opacity-0 translate-x-full")
    }>
      <section
      className={
        " w-screen max right-0 absolute bg-white shadow-xl delay-400 duration-500 ease-in-out overflow-y-scroll transition-all transform  " +
        (toggleMenu ? " translate-x-0 " : " translate-x-full ")
      }
      >
        <article
        className='relative w-screen max mb-5 pb-10 grid grid-rows space-y-6 h-full overflow-y-scroll'>
        <div className='flex justify-between m-10'>
        <header className="p-4 font-bold text-lg">Add Your Brands</header>
        <MdOutlineCancel
        className="mr-5 mt-4 cursor-pointer text-red-500"
        onClick={() => {
          setToggleMenu(false);
        }}
        fontSize={28}
        />
       </div>
        <div className="flex w-full text-center justify-center items-center pr-10 pl-10">
        <div className="grid justify-center items-center bg-white lg:p-5 p-3 w-full">
          <div className="container">
          <div className="form-group preview">
          {file.length > 0 &&
            file.map((item, index) => {
              return (
                <div key={item}>
                  <img src={item} alt="" />
                  <button type="button" className='bg-red-500 text-white p-2 rounded m-5 cursor-pointer' onClick={() => deleteFile(index)}>
                    <MdDelete fontSize={20} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="form-group">
            <input
              type="file"
              disabled={file.length === 5}
              className="form-control"
              onChange={uploadSingleFile}
              multiple
            />
          </div>
          </div>

          <form 
          className="grid p-10 gap-6 lg:pl-5 mt-5 w-full" 
          onSubmit={handleSubmit(submitHandler)}>
          <div className='flex space-x-5'>
            <label htmlFor='title'
            className={`block pb-3 text-sm 2 ${
            errors.title ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}
            >Brand Title : </label>
              <input 
                name="title" 
                id="title" 
                type="text" 
                placeholder=''
                className={`block w-full ${
                  errors.title ? "text-red-400 border-red-400" : "text-gray-700 "} px-3 py-1 mb-2 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register("title", { 
                    required: "Title is Required!!!" ,
                   })}
                   onKeyUp={() => {
                     trigger("title");
                   }}
                  required={true}
                  />
                   {errors.title && (
                  <p className="text-red-500 text-sm mt-2">
                    Title is Required!!!
                  </p>
                )}
            </div>
            <div className='flex space-x-5'>
            <label htmlFor='slug'
            className={`block pb-3 text-sm 2 ${
            errors.slug ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}
            >Brands Slug : </label>
              <input 
                name="slug" 
                id="slug" 
                type="text" 
                placeholder=''
                className={`block w-full ${
                  errors.slug ? "text-red-400 border-red-400" : "text-gray-700 "} px-3 py-1 mb-2 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register("slug", { 
                    required: "Slug is Required!!!" ,
                   })}
                   onKeyUp={() => {
                     trigger("slug");
                   }}
                  required={true}
                  />
                   {errors.slug && (
                  <p className="text-red-500 text-sm mt-2">
                    Slug is Required!!!
                  </p>
                )}
            </div>
            <div className='flex space-x-5'>
            <label
            htmlFor='description'
              className={`block pb-3 text-sm 2 ${
              errors.description ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Brand Description:</label>
           <input 
                name="description" 
                id="description" 
                type="text" 
                placeholder=''
                className={`block w-full ${
                  errors.email ? "text-red-400 border-red-400" : "text-gray-700 "} px-3 py-1 mb-2 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register("description", { 
                    required: "Description is Required!!!" ,
                   })}
                   onKeyUp={() => {
                     trigger("description");
                   }}
                  required={true}
                  />
                   {errors.description && (
                  <p className="text-red-500 text-sm mt-2">
                    Description is Required!!!
                  </p>
                )}
            </div>
            <div className="flex justify-end items-end mt-5">
                <button
                  type="submit"
                  className="bg-[#1F451A] text-white hover: cursor-pointer p-4 rounded"
                >
                Add Brands
                </button>
              </div>
          </form>
        </div>
        </div>
        </article>
      </section>
    </main>
  )
}

export default BrandModal
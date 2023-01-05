import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa'
import { EditCategories } from '../apis/api';

const EditCategoryModal = ({ showModal, setShowModal, category, id }) => {
    const [currentCategory, setCurrentCategory] = useState({
        id: '',
    });
    const { enqueueSnackbar } = useSnackbar();
    
    const [file, setFile] = useState([]);
    const [image, setImage] = useState();

    console.log("Images: ",image);

console.log("Products: ", currentCategory);

useEffect(() => {
  setCurrentCategory({
    id:  category.id
  })
  }, [category.id]);

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

  console.log("Images: ",image);

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
    console.log(s);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm();


const submitHandler = async (data) => {
    console.log("Data Product Modal", data);

    const body = {
        label: data.title,
        slug: data.slug,
        category_image: image,
    }

    console.log('Body',body);
    try {
        EditCategories(id,body)
        .then(response => {
          console.log(response);
          const responseStatus = response.data.status
  
          if (responseStatus) {
            enqueueSnackbar('Product Edit Successful', { variant: responseStatus });
          } else {
            enqueueSnackbar("Product Edit failed" , { variant: responseStatus });
          }
            
          console.log("responseStatus ",responseStatus);
        })    
      } catch (error) {
      enqueueSnackbar("Products Edit Failed", { variant: 'error' });
      console.log(error);
        
    }
}

  return (
    <main
    className={
      " fixed overflow-hidden overflow-y-scroll z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
      ( showModal
        ? " transition-opacity opacity-100 duration-500 translate-x-0  "
        : " transition-all opacity-0 translate-x-full")
    }>
      <section
      className={
        " w-screen max right-0 absolute overflow-y-scroll bg-white shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
        (showModal ? " translate-x-0 " : " translate-x-full ")
      }
      >
        <article
        className='relative w-screen max mb-5 pb-10 grid grid-rows space-y-6 h-auto overflow-y-scroll'>
        <div className='flex justify-between m-10'>
        <header className="p-4 font-bold text-lg">Edit Your Product</header>
        <FaTimes
        className="mr-5 mt-4 cursor-pointer text-red-500"
        onClick={() => {
          setShowModal(false);
        }}
        fontSize={28}
        />
       </div>
        <div className="flex w-full text-center justify-center items-center pr-10 pl-10">
        <div className="grid justify-center items-center bg-white lg:p-5 p-3 w-full">
          <div className="container mb-5">
          <div className="form-group preview">
          {file.length > 0 &&
            file.map((item, index) => {
              return (
                <div key={item}>
                  <img src={item} alt="" />
                  <button type="button" className='bg-red-500 text-white p-2 rounded m-5 cursor-pointer' onClick={() => deleteFile(index)}>
                    delete
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
          onSubmit={handleSubmit(submitHandler)}>
          <div className="">
          <div className='space-y-5'>

            <div className='flex space-x-5'>
            <label htmlFor='title'
            className={`block pb-3 text-sm 2 ${
            errors.title ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}
            >Category Title : </label>
              <input 
                name="title" 
                id="title" 
                type="text" 
                placeholder=''
                // value={products.label}
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
            >Category Slug : </label>
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
            </div>

              <div className="flex justify-end items-end mt-5">
                <button
                  type="submit"
                  className="bg-[#1F451A] text-white hover: cursor-pointer p-4 rounded"
                >
                Edit Category
                </button>
              </div>
              </div>
          </form>
        </div>
        </div>
        </article>
        </section>
        </main>
  )
}

export default EditCategoryModal
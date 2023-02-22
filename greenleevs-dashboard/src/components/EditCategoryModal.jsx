import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md';
import { EditCategories, UploadFiles } from '../apis/api';
import { useNavigate } from 'react-router-dom';

const EditCategoryModal = ({ showModal, setShowModal, category }) => {
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    
    const navigate = useNavigate();

    function uploadSingleFile(e) {
      const selectedFiles = Array.from(e.target.files);
      console.log(selectedFiles);
      setFiles([...files, ...selectedFiles]);
    
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        console.log(file);
        formData.append('files[]', file, file.name);
      });
      if (selectedFiles.length > 0) {
        UploadFiles(formData)
          .then((res) => {
            console.log("Response: ", res);
            if (res !== undefined &&
              res !== null &&
              res.data !== undefined &&
              res.data !== null) {
              setUploadedFiles([...uploadedFiles, ...res.data.data]);
              toast.success("Image Added Successfully");
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error Uploading Image");
          });
      } else {
        toast.error("At least one file is required for upload.");
      }
    }
    
    function deleteFile(e) {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== e));
    }
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm();


const submitHandler = async (data) => {
    // console.log("Data Product Modal", data);

    const body = {
        label: data.title,
        slug: data.slug,
        image: uploadedFiles[0]['file_url'],
    }
    try {
        EditCategories(category.id ,body)
        .then(response => {
          console.log(response);
          const responseStatus = response.data.status
  
          if (responseStatus === "success") {
            toast.success('Category Edit Successful');
            navigate('/categories'); 
          } else {
            toast.error("Category Edit failed");
          }
        })    
      } catch (error) {
      toast.error("Category Edit Failed");
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
        className='relative w-screen max mb-5 pb-10 grid grid-rows space-y-6 h-screen overflow-y-scroll'>
        <div className='flex justify-between m-10'>
        <header className="p-4 font-bold text-lg">Edit Your Category</header>
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
        <div className="container mb-6">
          <div className="form-group preview">
          {files.length > 0 &&
            files.map((item, index) => {
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
              disabled={files.length === 5}
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
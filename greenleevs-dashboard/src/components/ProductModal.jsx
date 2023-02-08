import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useStateContext } from '../contexts/ContextProvider';
import { useSnackbar } from 'notistack';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { strain, thcContents, cbdContents, Status } from "../data/data"
import { CreateProducts, UploadFiles } from '../apis/api';

const ProductModal = ({ toggleMenu, setToggleMenu }) => {
  const { dispatch, state  } = useStateContext();
  const { categories } = state
  const navigate = useNavigate()

  const [tags, setTags] = useState([]);
  const [effectTags, setEffectTags] = useState([]);
  const [strains, setStrains] = useState(strain);
  const [status, setStatus] = useState(Status);
  const [category, setCategory] = useState(categories);
  const [thcContent, setThcContent] = useState(thcContents);
  const [cbdContent, setCbdContent] = useState(cbdContents);
  
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [files, setFiles] = useState([]);

   
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm({
    defaultValues: {
      special: false
    }
  });

  function uploadSingleFile(e) {
    const selectedFiles = Array.from(e.target.files);
    setFiles(
      [
        ...files,
        ...selectedFiles
      ]
    );
    const formData = new FormData();
    selectedFiles.forEach( (file) => {
      formData.append("files[]", file, file.name);
    });

    /** TODO: need to catch and let users know about the error!!! */
    UploadFiles(formData).then( (res) => {
      if ( res !== undefined && res !== null && res.data !== undefined && res.data !== null) {
        setUploadedFiles(
          [
            ...uploadedFiles,
            ...res.data.data
          ]
        );
        enqueueSnackbar('Image Added Successfully', { variant: res.data.status });
      }
    } ).catch( (error) => {
      console.log(error)
    });
  }

  function deleteFile(e) {
    const s = files.filter((item, index) => index !== e);
    setFiles(s);
    console.log(s);
  }

  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };
  const handleEffectsTagsChange = (newTags) => {
    setEffectTags(newTags)
  };

// console.log(categories);

  const submitHandler = async (data) => {
    // console.log("Data Product Modal", data.special);

    const body = {
      label: data.title,
      product_image: uploadedFiles[0]['file_url'],
      product_images: uploadedFiles.map((file) => file['file_url']),
      quantity: data.quantity,
      description: data.description,
      price: data.price,
      category_id: data.categoryId,
      sale_price: data.salePrice,
      tags: tags,
      status: data.status,
      product_meta: [
        {
          option: "weight",
          values: data.weight
        },
        {
          option: "strain",
          values: data.strain
        },
        {
          option: "thc",
          values: data.thcContent
        },
        {
          option: "cbd",
          values: data.cbdContent
        },
        {
          option: "effects",
          values: effectTags
        }
      ],
      special: data.special,
    };
    console.log('Body',body);

    try {
      CreateProducts(body)
       .then(response => {
        // console.log(response);
        const responseStatus = response.data.status
        if (responseStatus  === "success") {
          enqueueSnackbar('Products Added Successfully', { variant: responseStatus });
        } else {
          enqueueSnackbar("Products Upload failed" , { variant: responseStatus });
        }
      });
      dispatch({ type: 'ADD_PRODUCTS', payload: body});
      localStorage.setItem('products', JSON.stringify(body));
      navigate('/products');
    } catch (error) {
      console.log(error);
    }
  };

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
        <header className="p-4 font-bold text-lg">Add Your Products</header>
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
          {files.length > 0 &&
            files.map((item, index) => {
              return (
                <div key={index}>
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
              disabled={files.length === 5}
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
            >Product Title : </label>
              <input 
                name="title" 
                id="title" 
                type="text" 
                placeholder=''
                className={`block w-full ${
                  errors.email ? "text-red-400 border-red-400" : "text-gray-700 "} px-3 py-1 mb-2 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
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
            <label
            htmlFor='description'
              className={`block pb-3 text-sm 2 ${
              errors.description ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Product Description:</label>
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
            <div className='flex space-x-5'>
            <label
              htmlFor="tags"
              className={`block pb-3 text-sm 2 ${
                        errors.tags ? 'text-red-400' : 'text-gray-700 '
               } dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}
              >
                     Product Tags:
                    </label>
                    <TagsInput
                      name="tags"
                      id="tags"
                      autoComplete="off"
                      required={true}
                      placeholder="Enter Tags"
                      maxTags={10}
                      value={tags}
                      onChange={handleTagsChange}
                      className="block w-full px-3 py-1 text-sm
                      h-32 focus:outline-none leading-5 rounded-md tag-box react-tagsinput focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#0F1926] border p-2 bg-gray-100 border-transparent focus:bg-white"
                      type="text"
                    />
                    {errors.tags && <p className="mt-2 text-sm text-red-500">Please Enter the tags!!!</p>}
            </div>
            <div className='flex space-x-5'>
            <label
             htmlFor='quantity'
             className={`block pb-3 text-sm 2 ${
             errors.quantity ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Product Quantity:</label>
                <input 
                name="quantity" 
                id="quantity" 
                type="number" 
                placeholder=''
                className={`block w-full ${
                  errors.quantity ? "text-red-400 border-red-400" : "text-gray-700 "} px-3 py-1 mb-2 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register("quantity", { 
                    required: "quantity is Required!!!" ,
                   })}
                   onKeyUp={() => {
                     trigger("quantity");
                   }}
                  required={true}
                  />
                   {errors.quantity && (
                  <p className="text-red-500 text-sm mt-2">
                    quantity is Required!!!
                  </p>
                )}
            </div>
            <div className='flex space-x-5'>
            <label
              htmlFor='price'
              className={`block pb-3 text-sm 2 ${
              errors.price ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Product Price:</label>
            <input 
                name="price" 
                id="price" 
                type="text" 
                placeholder=''
                className={`block w-full ${
                  errors.price ? "text-red-400 border-red-400" : "text-gray-700 "} px-3 py-1 mb-2 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register("price", { 
                    required: "price is Required!!!" ,
                   })}
                   onKeyUp={() => {
                     trigger("price");
                   }}
                  required={true}
                  />
                   {errors.price && (
                  <p className="text-red-500 text-sm mt-2">
                    price is Required!!!
                  </p>
                )}
            </div>
            <div className='flex space-x-5'>
            <label
              htmlFor='salePrice'
              className={`block pb-3 text-sm 2 ${
              errors.salePrice ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Product Sale Price:</label>
            <input 
                name="salePrice" 
                id="salePrice" 
                type="text" 
                placeholder=''
                className={`block w-full ${
                  errors.salePrice ? "text-red-400 border-red-400" : "text-gray-700 "} px-3 py-1 mb-2 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register("salePrice", { 
                    required: "salePrice is Required!!!" ,
                   })}
                   onKeyUp={() => {
                     trigger("salePrice");
                   }}
                  required={true}
                  />
                   {errors.salePrice && (
                  <p className="text-red-500 text-sm mt-2">
                    Sales Price is Required!!!
                  </p>
                )}
            </div>
            <div className='flex space-x-5'>
            <label htmlFor='weight'
            className={`block pb-3 text-sm 2 ${
            errors.weight ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}
            >Product Weight : </label>
              <input 
                name="weight" 
                id="weight" 
                type="text" 
                placeholder=''
                className={`block w-full ${
                  errors.weight ? "text-red-400 border-red-400" : "text-gray-700 "} px-3 py-1 mb-2 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#1F451A] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register("weight", { 
                    required: "Weight is Required!!!" ,
                   })}
                   onKeyUp={() => {
                     trigger("weight");
                   }}
                  required={true}
                  />
                   {errors.weight && (
                  <p className="text-red-500 text-sm mt-2">
                    Weight is Required!!!
                  </p>
                )}
            </div>
              <div className='flex space-x-5 mb-5'>
                <label className="text-sm font-normal">Product Strain:</label>
                <select
                 id="strain"  
                 className={` ${
                errors.strain ? ' border-red-400' : ''} w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer`}
                {...register('strain')}
                  onChange={(e) => {
                    setStrains(e.target.value);
                  }}
                >
                  <option value="others" className="sm:text-bg bg-white">Select Strain</option>
                  {strain.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}  key={item.id}>
                    {item.name}
                  </option>
                      ))}
                </select>
              </div>
              <div className='flex space-x-5 mb-3'>
                <label>Product THC Content:</label>
                <select
                  onChange={(e) => {
                    setThcContent(e.target.value);
                  }}
                  id="content"  
                  className={` ${
                    errors.thcContent ? ' border-red-400' : ''} w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer`}
                    {...register('thcContent')}
                >
                  <option value="others" className="sm:text-bg bg-white">Select Content</option>
                  {thcContent.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}  key={item.id}>
                    {item.name}
                  </option>
                      ))}
                </select>
              </div>
              <div className='flex space-x-5 mb-3'>
                <label>Product CBD Content:</label>
                <select
                  onChange={(e) => {
                    setCbdContent(e.target.value);
                  }}
                  id="content"  
                  className={` ${
                    errors.content ? ' border-red-400' : ''} w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer`}
                    {...register('cbdContent')}
                >
                  <option value="others" className="sm:text-bg bg-white">Select Content</option>
                  {cbdContent.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}  key={item.id}>
                    {item.name}
                  </option>
                      ))}
                </select>
              </div>
              <div className='flex space-x-5 mb-3'>
                <label>Product Effects:</label>
                <TagsInput
                      name="effectTags"
                      id="effectTags"
                      autoComplete="off"
                      required={true}
                      placeholder="Enter Tags"
                      maxTags={10}
                      value={effectTags}
                      onChange={handleEffectsTagsChange}
                      className="block w-full px-3 py-1 text-sm
                      h-32 focus:outline-none leading-5 rounded-md tag-box react-tagsinput focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#0F1926] border p-2 bg-gray-100 border-transparent focus:bg-white"
                      type="text"
                    />
                    {errors.effectTags && <p className="mt-2 text-sm text-red-500">Please Enter the  Effects tags!!!</p>}
              </div>
              <div className='flex space-x-5'>
            <label className="text-sm font-normal">Product Status: </label>
                 <select
                 id="status"  
                 className={` ${
                errors.status ? ' border-red-400' : ''} w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer`}
                {...register('status')}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option value="others" className="sm:text-bg bg-white">Select Product Status</option>
                  {Status?.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}  key={item.id}>
                    {item.name}
                  </option>
                      ))}
                </select>
            </div>
            <div className='flex space-x-5'>
            <label className="text-sm font-normal">Choose Category Id: </label>
                 <select
                 id="categoryId"  
                 className={` ${
                errors.categoryId ? ' border-red-400' : ''} w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer`}
                {...register('categoryId')}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value="others" className="sm:text-bg bg-white">Select Category Id</option>
                  {categories?.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.id}  key={item.id}>
                    {item.slug}
                  </option>
                      ))}
                </select>
            </div>
              <div id='special' className='flex justify-between pt-10 pb-5'>
              <p className='pb-5 text-[#2D2D2D] text-sm'>Special product</p>


              <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register('special')}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#546052] dark:peer-focus:ring-[#1F451A] dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:[#1F451A]"></div>
            </label>
              </div>
              <div className="flex justify-end items-end mt-5">
                <button
                  type="submit"
                  className="bg-[#1F451A] text-white hover: cursor-pointer p-4 rounded"
                   
                >
                Add Products
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

export default ProductModal
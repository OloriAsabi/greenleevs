import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import Spinner from './Spinner';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useStateContext } from '../contexts/ContextProvider';
import { useSnackbar } from 'notistack';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { contents, effect, strain, weights } from "../data/data"
import { CreateProducts } from '../apis/api';

const token =  localStorage.getItem("token");

const ProductModal = ({toggleMenu, setToggleMenu}) => {
  const { dispatch  } = useStateContext();
  const navigate = useNavigate()
 
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm();

  const [fields, setFields] = useState();
  const [tags, setTags] = useState([]);
  const [imageAsset, setImageAsset] = useState([]);
  const [strains, setStrains] = useState(strain);
  const [weight, setWeight] = useState(weights);
  const [content, setContent] = useState(contents);
  const [effects, setEffects] = useState(effect);
  const [loading, setLoading] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [previewImage, setPreviewImage] = useState(undefined);

  const handleTagsChange = (newTags) => {
    console.log(tags)
    console.log(newTags)

    setTags(newTags);
  };

  const selectFile = (e) => {
    const selectedFile = e.target.files[0];
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(URL.createObjectURL(e.target.files[i]));
    }
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);
      setImageAsset(images);
      setPreviewImage(selectedFile);
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

const uploadImage = async () => {
    //Check if any file is selected or not
  if (imageAsset != null) {
    //If file selected then create FormData
    const fileToUpload = imageAsset
    const imageData = new FormData();
    Array.from(fileToUpload).forEach(item => {
      imageData.append('name', 'Image Upload');
      imageData.append('file_attachment', item)
    })
    let res = await fetch(
      'http://127.0.0.1:8000/v1/admin/upload/files',
      {
        method: 'post',
        body: imageData,
        headers: {
          'Content-Type': 'multipart/form-data; ',
          'Authorization': token,
        },
      }
    );
    let responseJson = await res.json();
    console.log(responseJson);
    if (responseJson.status == 1) {
      alert('Upload Successful');
    }
  } else {
    //if no file selected the show alert
    alert('Please Select File first');
  }
};

  const submitHandler = async (data) => {
    console.log("Data Product Modal", data);

    const body = {
      label: data.title,
      product_image: URL.createObjectURL(imageAsset),
      product_images: [URL.createObjectURL(imageAsset)], 
      quantity: data.quantity,
      description: data.description,
      price: data.price,
      category_id: 2,
      sale_price: data.salePrice,
      tags: tags,
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
          option: "content",
          values: data.content
        },
        {
          option: "effects",
          values: data.effects
        }
      ]
    };

    console.log('Body',body);
    try {
      CreateProducts(body)
       .then(response => {
        console.log(response);
      });
      dispatch({ type: 'ADD_PRODUCTS', payload: body});
      localStorage.setItem('products', JSON.stringify(body));
      navigate('/products');
      enqueueSnackbar('Products Added Successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar("Products Upload failed", { variant: 'error' });
    }
   

  };

  console.log(imageAsset);

  return (
    <main
    className={
      " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
      ( toggleMenu
        ? " transition-opacity opacity-100 duration-500 translate-x-0  "
        : " transition-all opacity-0 translate-x-full")
    }>
      <section
      className={
        " w-screen max right-0 absolute bg-white shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
        (toggleMenu ? " translate-x-0 " : " translate-x-full ")
      }
      >
        <article
        className='relative w-screen max mb-5 pb-10 grid grid-rows space-y-6 h-screen overflow-y-scroll'>
        <div className='flex justify-between mt-5'>
        <header className="p-4 font-bold text-lg">Add Your Products</header>
        <MdOutlineCancel
        className="mr-5 mt-4 cursor-pointer text-red-500"
        onClick={() => {
          setToggleMenu(false);
        }}
        fontSize={28}
        />
       </div>
        <div className="flex w-full text-center justify-center items-center p-5">
        {fields && (
          <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">Please add all fields.</p>
        )}
        <div className="grid justify-center items-center bg-white lg:p-5 p-3 w-full">
          <div className="p-3 flex flex-0.7 w-full">
            <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
              {loading && (
                <Spinner />
              )}
              {
                wrongImageType && (
                  <p>It&apos;s wrong file type.</p>
                )
              }
              {!imageAsset ? (
                <label>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col justify-center items-center">
                      <p className="font-bold text-2xl">
                        <AiOutlineCloudUpload />
                      </p>
                      <p className="text-lg">Click to upload</p>
                    </div>

                    <p className="mt-32 text-gray-400">
                      Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept='image/*'
                    multiple
                    name="upload-image"
                    onChange={selectFile}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className="relative h-full">
                  <img
                    src={previewImage}
                    alt="uploaded-pic"
                    className="h-full w-full"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setPreviewImage(null)}
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
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
                      // {...register('tags', {
                      //   required: 'Please Enter the tags!!!',
                      // validate: v => console.log(v)
                      // })}
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
            {/* <div className='flex space-x-5'>
            <label>Unit(kg/pc/lb/ml/g...etc):</label>
            <input
              type="number"
              placeholder=""
              className="w-full border border-gray-200 p-2"
            />
            </div> */}
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
                type="number" 
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
                type="number" 
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
            <div className='flex space-x-5 mb-5'>
                <label className="text-sm font-normal">Product Weight:</label>
                <select
                 id="weight"  
                 className={` ${
                errors.weight ? ' border-red-400' : ''} w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer`}
                {...register('weight')}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                >
                  <option value="others" className="sm:text-bg bg-white">Select Weight</option>
                  {weights.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}  key={item.id}>
                    {item.name}
                  </option>
                      ))}
                </select>
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
                <label>Product Content:</label>
                <select
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  id="content"  
                  className={` ${
                    errors.content ? ' border-red-400' : ''} w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer`}
                    {...register('content')}
                >
                  <option value="others" className="sm:text-bg bg-white">Select Content</option>
                  {content.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}  key={item.id}>
                    {item.name}
                  </option>
                      ))}
                </select>
              </div>
              <div className='flex space-x-5 mb-3'>
                <label>Product Effects:</label>
                <select
                  // className="outline-none w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer"
                  onChange={(e) => {
                    setEffects(e.target.value);
                  }}
                  id="effects"  
                  className={` ${
                    errors.effects ? ' border-red-400' : ''} w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer`}
                  {...register('effects')}
                >
                  <option value="others" className="sm:text-bg bg-white">Select Effects</option>
                  {effects.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name} key={item.id}>
                    {item.name}
                  </option>
                      ))}
                </select>
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
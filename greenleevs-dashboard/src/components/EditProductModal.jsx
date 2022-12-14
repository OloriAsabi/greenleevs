import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa'
import { EditProduct } from '../apis/api';
import { cbdContents, contents, effect, strain, thcContents, weights } from "../data/data"
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

const EditProductModal = ({ showModal, setShowModal, products, id }) => {
const [currentProduct, setCurrentProduct] = useState({
    id: '',
});
const { enqueueSnackbar } = useSnackbar();
const [tags, setTags] = useState([]);
const [strains, setStrains] = useState(strain);
const [weight, setWeight] = useState(weights);
const [thcContent, setThcContent] = useState(thcContents);
const [cbdContent, setCbdContent] = useState(cbdContents);
const [effects, setEffects] = useState(effect);

const [file, setFile] = useState([]);
const [image, setImage] = useState();

console.log("Images: ",image);

console.log("Products: ", currentProduct);

useEffect(() => {
  setCurrentProduct({
    id: products.product_id,
  })
  }, [products]);

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

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm();

  const handleTagsChange = (newTags) => {
    console.log(tags)
    console.log(newTags)

    setTags(newTags);
  };

const submitHandler = async (data) => {
  console.log("Data Product Modal", data);

  const body = {
    label: data.title,
    product_image: image,
    product_images: file, 
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
        values: data.thcContent
      },
      {
        option: "content",
        values: data.cbdContent
      },
      {
        option: "effects",
        values: data.effects
      }
    ]
  };

  console.log('Body',body);
  console.log(id);
  try {
    EditProduct(id,body)
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
        className='relative w-screen max mb-5 pb-10 grid grid-rows space-y-6 h-full overflow-y-scroll'>
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
            >Product Title : </label>
              <input 
                name="title" 
                id="title" 
                type="text" 
                placeholder=''
                // value={products.label}
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
                // value={products.description}
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
            </div>
            <div className='space-y-5'>
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
        </div> 
          <div className='space-y-5'>
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
                <label>Product THC Content:</label>
                <select
                  onChange={(e) => {
                    setThcContent(e.target.value);
                  }}
                  id="content"  
                  className={` ${
                    errors.content ? ' border-red-400' : ''} w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer`}
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
                    errors.cbdContent ? ' border-red-400' : ''} w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer`}
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
            </div>
              <div className="flex justify-end items-end mt-5">
                <button
                  type="submit"
                  className="bg-[#1F451A] text-white hover: cursor-pointer p-4 rounded"
                >
                Edit Products
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

export default EditProductModal
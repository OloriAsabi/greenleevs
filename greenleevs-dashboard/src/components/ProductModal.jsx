import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import Spinner from './Spinner';
import { client } from '../client';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const ProductModal = ({toggleMenu, setToggleMenu, child, parent, type}) => {
  const navigate = useNavigate();

  const [fields, setFields] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [productPrice, setProductPrice] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription]= useState('');
  const [parentCategory, setParentCategory] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const [productType, setProductType] = useState([]);
  const [tag, setTag] = useState();
  const [unit, setUnit] = useState();
  const [quantity, setQuantity]= useState()
  const [salePrice, setSalePrice]= useState();
  const [loading, setLoading] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);

  // console.log(childCategory);

  useEffect(() => {
    setChildCategory(child.map((item) => item))
    setParentCategory(parent.map((item) => item))
    setProductType(type.map((item) => item))
  }, [child, parent, type])
  
  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (
      title && 
      childCategory && 
      description && 
      imageAsset?._id && 
      parentCategory && 
      productPrice && 
      tag && 
      productType && 
      quantity && 
      salePrice && 
      unit) {
      const doc = {
        _type: 'product',
        title,
        description,
        tag,
        productPrice,
        productType,
        salePrice,
        unit,
        quantity,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        id: Math.random().toString(32).substring(2),
        parentCategory,
      };
      client.create(doc).then(() => {
        navigate('/');
      });
    } else {
      setFields(true);

      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
  };

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
                    name="upload-image"
                    onChange={uploadImage}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className="relative h-full">
                  <img
                    src={imageAsset?.url}
                    alt="uploaded-pic"
                    className="h-full w-full"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setImageAsset(null)}
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid p-10 gap-6 lg:pl-5 mt-5 w-full">
            <div className='flex space-x-5'>
            <label>Product Title : </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder=""
              className="w-full border border-gray-200 p-2"
            />
            {/* {user && (
              <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full"
                  alt="user-profile"
                />
                <p className="font-bold">{user.userName}</p>
              </div>
            )} */}
            </div>
            <div className='flex space-x-5'>
            <label>Product Details:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=""
              className="w-full border border-gray-200 p-2"
            />
            </div>
            <div className='flex space-x-5'>
            <label>Product Tag:</label>
            <input
              type="text"
              vlaue={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder=""
              className="w-full border border-gray-200 p-2"
            />
            </div>
            <div className='flex space-x-5'>
            <label>Unit(kg/pc/lb/ml/g...etc):</label>
            <input
              type="number"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder=""
              className="w-full border border-gray-200 p-2"
            />
            </div>
            <div className='flex space-x-5'>
            <label>Product Quantity:</label>
              <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder=""
              className="w-full border border-gray-200 p-2"
            />
            </div>
            <div className='flex space-x-5'>
            <label>Product Price:</label>
              <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder=""
              className="w-full border border-gray-200 p-2"
            />
            </div>
            <div className='flex space-x-5'>
            <label>Sale Price:</label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              placeholder=""
              className="w-full border border-gray-200 p-2"
            />
            </div>
            <div className="">
              <div className='flex space-x-5 mb-5'>
                <label className="text-sm font-normal">Parent category:</label>
                <select
                  onChange={(e)=>(setParentCategory(e))}
                  className="w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer"
                >
                  <option value="others" className="sm:text-bg bg-white">Select Category</option>
                  {parentCategory.map((item) => (
                    <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex space-x-5 mb-3'>
                <label>Child category:</label>
                <select
                  onChange={(e) => (setChildCategory(e.target.value))}
                  className="w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer"
                >
                  <option value="others" className="sm:text-bg bg-white">Select Category</option>
                  {childCategory.map((item) => (
                    <option className="text-base border-0 outline-none capitalize bg-white text-black " key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex space-x-5 mb-3'>
                <label>Product type:</label>
                <select
                  onChange={(e) => (setProductType(e))}
                  className="outline-none w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer"
                >
                  <option value="others" className="sm:text-bg bg-white">Select Category</option>
                  {productType.map((item) => (
                    <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end items-end mt-5">
                <button
                  type="button"
                  onClick={savePin}
                  className="bg-[#1F451A] text-white hover: cursor-pointer p-4 rounded"
                >
                Add Products
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        </article>
      </section>
    </main>
  )
}

export default ProductModal
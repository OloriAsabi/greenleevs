import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import Spinner from './Spinner';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const CategoryModal = ({toggleMenu, setToggleMenu, type}) => {
    const navigate = useNavigate();

    const [fields, setFields] = useState();
    const [imageAsset, setImageAsset] = useState();
    const [parentCategory, setParentCategory] = useState('');
    const [childCategory, setChildCategory] = useState('');
    const [productType, setProductType] = useState([]);
    const [loading, setLoading] = useState(false);
    const [wrongImageType, setWrongImageType] = useState(false);


  useEffect(() => {
    setProductType(type.map((item) => item))
  }, [type])
  
  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);
      // client.assets
      //   .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
      //   .then((document) => {
      //     setImageAsset(document);
      //     setLoading(false);
      //   })
      //   .catch((error) => {
      //     console.log('Upload failed:', error.message);
      //   });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (

      childCategory && 
      imageAsset?._id && 
      parentCategory && 
      productType
      ) {
      const doc = {
        _type: 'product',
        productType,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        id: Math.random().toString(32).substring(2),
      };
      // client.create(doc).then(() => {
      //   navigate('/');
      // });
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
            <div className='flex space-x-5'>
            <label>Parent category:</label>
            <input
              type="text"
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
              placeholder=""
              className="w-full border border-gray-200 p-2"
            />
            </div>
            <div className='flex space-x-5'>
            <label>Child category:</label>
            <input
              type="text"
              value={childCategory}
              onChange={(e) => (setChildCategory(e.target.value))}
              placeholder=""
              className="w-full border border-gray-200 p-2"
            />
            </div>
            <div className="">
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

export default CategoryModal
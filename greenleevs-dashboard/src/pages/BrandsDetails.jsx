import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GetBrandById } from '../apis/api';
import { EditBrandModal } from '../components';
import Spinner from '../components/Spinner';


const BrandsDetails = () => {
    const { id }  = useParams();
    const [brand, setBrand] = useState({});
    const [showModal, setShowModal] = useState(false);
    const history =  useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        GetBrandById(id).then((data) => {
            console.log(data)
            const items = data.data
            setBrand(items.data);
            setIsLoading(false)
        })
    },[id]);

    console.log(brand);
  return (
    <div className='container'>
        {brand 
        ? 
        <div className='flex md:flex-row flex-col small justify-between p-10' key={brand.id}>
        <div className='w-screen'>
        <img src={brand.logo} className="w-full object-cover " alt="BrandImage"/>
        </div>
         <div className='w-full h-full p-5'>
         {isLoading && (
            <Spinner />
              )}
        <h2 className='text-2xl text-start text-gray-700 uppercase'>{brand.label}</h2>
        <p className='text-14 pt-5 capitalize'>{brand.description}</p>
        </div>
     </div> 
     : ""
}

     <div className='block text-center m-10'>
    <button className='text-white w-20 bg-[#1F451A] rounded items-center cursor-pointer text-center text-xl p-2 font-extrabold m-3'
    onClick={() => setShowModal(true)}
    >
    Edit
    </button>
    <button className='text-white w-20 bg-[#1F451A] rounded items-center cursor-pointer text-center text-xl p-2 font-extrabold m-3 ' onClick={() => history('/products')}>
    Back
    </button>
    </div>
    {showModal ? 
          <EditBrandModal
           id={id}
           showModal={showModal} 
           setShowModal={setShowModal}
        /> 
    : ''}
</div>
  )
}

export default BrandsDetails
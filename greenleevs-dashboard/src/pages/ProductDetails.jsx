import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getProductId } from '../apis/api'
import { EditProductModal } from '../components';
import Spinner from '../components/Spinner';


const Productdetails = () => {
    const { id }  = useParams();
    const [product, setProduct] = useState({});
    const [showModal, setShowModal] = useState(false);
    const history =  useNavigate();
    const [isLoading, setIsLoading] = useState(false);   

    useEffect(() => {
        setIsLoading(true)
        getProductId(id).then((data) => {
            const items = data.data
            setProduct(items.data);
            setIsLoading(false)
        })
    },[id]);

  return (  
    <div className='container'>
        {product 
        ? 
        <div className='flex md:flex-row flex-col small justify-between p-10' key={product.id}>
        <div className='w-screen'>
        <img src={product.product_image} className="w-full object-cover " alt="ProductImage"/>
        </div>
         <div className='w-full h-full p-5'>
         {isLoading && (
            <Spinner />
              )}
        <h2 className='text-2xl text-start text-gray-700 uppercase'>{product.label}</h2>
        <div className='rounded text-center text-2xl p-1 font-extrabold m-3 text-[#1F451A]'>${product.price}</div>
        <div className='justify-start'>
            <div className='flex justify-between  text-center'>
                <h5 className='mt-2 pr-3 pt-3 pb-3'>Category:</h5>
                <button className='text-white bg-[#1F451A] rounded p-3'>{product?.category?.label}</button>
            </div>
            <div className='flex justify-between text-center'>
                <h5 className='mt-2 pr-4 pt-3 pb-3'>Tags:  </h5>
                {product?.tags?.map((tag) => (
                   <button className='text-white bg-[#1F451A] rounded items-center text-center p-3 m-3' key={tag}>{tag}</button>
                ))}
            </div>
            <div className='flex justify-between text-center'>
                <h5 className='mt-2 pr-6 pt-3 pb-3'>Quantity:      </h5>
                <button className='text-white bg-[#1F451A] rounded items-center text-center p-3 m-3'>{product.quantity}</button>
            </div>
        </div>
        <p className='text-14 pt-5 capitalize'>{product.description}</p>
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
          <EditProductModal
            id={id}
           showModal={showModal} 
           setShowModal={setShowModal}
           product={product} /> 
    : ''}
</div>
  )
}

export default Productdetails
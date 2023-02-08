import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GetCategoryById } from '../apis/api';
import { EditCategoryModal } from '../components';
import Spinner from '../components/Spinner';

const CategoryDetails = () => {
    const { id }  = useParams();
    const [category, setCategory] = useState({});
    const [showModal, setShowModal] = useState(false);
    const history =  useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        GetCategoryById(id).then((data) => {
            const items = data.data
            setCategory(items.data);
            setIsLoading(false)
        })
    },[id]);
    
  return (
    <div className='container'>
    {category 
    ? 
    <div className='flex md:flex-row flex-col small justify-between p-10'  key={category.id}>
      <div className='w-screen'>
     <img src={category.image} className="w-full object-cover " alt="CategoryImage"/>
    </div>
      <div className='w-full h-full p-5'>
      {isLoading && (
        <Spinner />
         )}
      <h2 className='text-2xl text-start text-gray-700 uppercase'>{category.label}</h2>
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
<button className='text-white w-20 bg-[#1F451A] rounded items-center cursor-pointer text-center text-xl p-2 font-extrabold m-3 ' onClick={() => history('/categories')}>
Back
</button>
</div>

{showModal ? 
                  <EditCategoryModal
                  category={category}
                  showModal={showModal} 
                  setShowModal={setShowModal}
               /> 
                : ''}
</div>
  )
}

export default CategoryDetails
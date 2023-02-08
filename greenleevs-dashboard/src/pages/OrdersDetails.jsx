import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GetOrderById } from '../apis/api';
import { OrdersModal } from '../components';
import Spinner from '../components/Spinner';

const OrdersDetails = () => {

    const { id }  = useParams();
    const [order, setOrder] = useState({});
    const [showModal, setShowModal] = useState(false);
    const history =  useNavigate();
    const [isLoading, setIsLoading] = useState(false);   


    useEffect(() => {
        setIsLoading(true)
        GetOrderById(id).then((data) => {
            // console.log(data)
            const items = data.data
            setOrder(items.data);
            setIsLoading(false)
        })
    },[id]);

  return (
    <div className='container'>
    {order 
    ? 
        <div className=''>
                {isLoading && (
            <Spinner />
              )}
                <div className='text-center mt-10 mb-10 flex flex-col items-center  gap-y-10 justify-evenly '>
                    <div className='flex justify-evenly gap-x-10 text-center text-2xl'> Order Status:<span className='text-xl'>{order.status}</span> </div>
                    <div className='flex justify-evenly gap-x-10 text-center text-2xl'>Amount: 
                    <span className='text-xl'>{order.amount}</span>
                    </div>
                    <div className='flex justify-evenly gap-x-10 text-center text-2xl'>Shipping Address: 
                    <span className='text-xl'> {order.shipping_address} </span>
                    </div>
                    <div className='flex justify-evenly gap-x-10 text-center text-2xl'>Phone Number: 
                    <span className='text-xl'> {order.phone_number} </span>
                    </div>
                    <div className='flex justify-evenly gap-x-10 text-center text-2xl'>Payment Method: 
                     <span className='text-xl'> {order.pay_method} </span>
                    </div>
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
<button className='text-white w-20 bg-[#1F451A] rounded items-center cursor-pointer text-center text-xl p-2 font-extrabold m-3 ' onClick={() => history('/orders')}>
Back
</button>
</div>
{showModal ? 
      <OrdersModal
      id={id}
       showModal={showModal} 
       setShowModal={setShowModal}
      /> 
: ''}
</div>
  )
}

export default OrdersDetails
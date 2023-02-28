import React,  { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components';
import { toast } from 'react-toastify';
import { GetOrders } from '../../apis/api';

const Orders = () => {
  const { users } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    if(!users) {
      navigate("/login")
    }
  }, [navigate, users]);

  useEffect(() => {
    setIsLoading(true)
    GetOrders()
    .then((res) => {
      if (res.status === 200) {
        const data = res.data.data
    
        setOrders(data)
        setIsLoading(false)
    }else{
      toast.error(res.data.message);
    }
    }).catch((e) => {
      toast.error(e);
      });
  }, []);


  return (
    <div>
      <div className='container mx-auto small my-8 p-10'>
      <div className='flex justify-between items-center gap-1'>
      <h4 className='text-3xl font-bold pb-5'>Order</h4>
      </div>
     <p className='text-[#2D2D2D]'>Here are the orders you’ve made so far</p>

      <div className='mt-10 flex flex-col  space-y-10 '>
      {isLoading
                  ? 
                  <Spinner /> 
                  :
                  <div>
                 {orders.map((order) => (
                  <div className='mt-10 flex flex-col  space-y-10 ' key={order.id}>
                  <div className='flex w-auto p-10 bg-white rounded-lg border h-54 lg:flex-row productDetails justify-between gap-10 border-gray-200 shadow-md'>
                  {order?.products?.map((product) => (
                   <div className='flex flex-row gap-10' key={product.product_id}>
                  <img src={product.product_image} alt='' className='cartBg '/> 
                    <div className='flex flex-col space-y-10'>
                      <p>{product.label}</p>
                      <p>{product.description}</p>
                    </div>
                  </div>
                  ))}
                  <div className='flex flex-col items-center gap-10'>
                    <p className='flex justify-between gap-10 text-xl'>Status: 
                    <span className='text-[#1F451A] text-xl bg-[#8aa287] rounded-md p-2'> {order.status}</span></p>
                    <p className='flex justify-between gap-10 text-xl'> Currency :
                    <span className='text-[#1F451A] text-xl bg-[#8aa287] rounded-md p-2'> {order.currency}</span></p>
                    <p className='flex justify-between gap-10 text-xl'> Amount: 
                    <span className='text-[#1F451A] text-xl bg-[#8aa287] rounded-md p-2'> {order.amount}</span>
                    </p>
                    <p className='flex justify-between gap-10 text-xl'>Payment Method: 
                    <span className='text-[#1F451A] text-xl bg-[#8aa287] rounded-md p-2'> {order.pay_method}</span>
                    </p>
                  </div>
                  </div>
                   </div>
                 ))} 
                 </div>
            } 
      </div>
      </div>
    </div>
  )
}

export default Orders
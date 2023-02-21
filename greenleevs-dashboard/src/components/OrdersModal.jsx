import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import React from 'react'
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { UpdateOrderStatus } from '../apis/api';
import { orderStatus } from '../data/data';
import { useNavigate } from 'react-router-dom';

const OrdersModal = ({ showModal, setShowModal, id }) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const submitHandler = async (data) => {
        const body = {
            order_id: id,
            status: data.status
        }
        try {
            UpdateOrderStatus(body)
            .then(response => {
              const responseStatus = response.status
      
              if (responseStatus  === "success" || 200) {
                toast.success('Order Status Successful');
                navigate('/orders');
              } else {
                toast.error("Order Status failed" );
              }
            })    
          } catch (error) {
          toast.error("Order Status  Failed");         
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
        className='relative w-screen max mb-5 pb-10 grid grid-rows space-y-6 h-auto overflow-y-scroll'>
        <div className='flex justify-between m-10'>
        <header className="p-4 font-bold text-lg">Edit Your Order's Status</header>
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
          <form 
          className="grid p-10 gap-6 lg:pl-5 mt-5 w-full" 
          onSubmit={handleSubmit(submitHandler)}>
             <div className='flex space-x-5'>
            <label className="text-sm font-normal">Orders Status: </label>
                 <select
                 id="status"  
                 className={` ${
                errors.status ? ' border-red-400' : ''} w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer`}
                {...register('status')}
                >
                  <option value="others" className="sm:text-bg bg-white">Select Order's Status</option>
                  {orderStatus?.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}  key={item.id}>
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
                Update Orders
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

export default OrdersModal
import { useSnackbar } from 'notistack';
import React from 'react';
import { BsCart } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { PostCart } from '../apis/api';
import { useStateContext } from '../contexts/ContextProvider';
import Spinner from './Spinner';
/* eslint-disable */

const FlexStyle = ({ filteredProducts , isLoading}) => {
  const history = useNavigate();


  const { state } = useStateContext();
  const { cart } = state;
  const { enqueueSnackbar } = useSnackbar();

  const addToCartHandler = async (e) => {
    const existItem = cart.cartItems.find((x) => x._id === e.product_id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
        if (e.countinStock < quantity) {
      enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
      return;
    }
    const body = {
      product_id: e.product_id,
      quantity: quantity,
    }
    PostCart(body)
      .then((res) => {
        console.log(res);
        dispatch({
          type: 'CART_ADD_ITEM',
          payload: {
            _key: e.product_id,
            name: e.label,
            countInStock: e.countinStock,
            slug: e.slug,
            price: e.price,
            image: e.product_image,
            quantity,
          },
        });
        if(res.data.status === 'success'){
           enqueueSnackbar(`${product.label} added to the cart`, {
          variant: res.status, 
        });
              // history('/carts')
        }else{
          enqueueSnackbar(res.data.message, { variant: res.data.status });
        }
      })
  };
  return (
    <div>
       {isLoading
          ? 
          <Spinner /> 
          :
      <div className='flex flex-col pl-5 gap-10 pt-10 justify-between w-full'>
        {filteredProducts.map((cat) => (
          <Link to={`/product/${cat.slug}`} key={cat.product_id}>
            <div className='w-full h-full accessoryBg flex flex-row justify-between items-center gap-10 p-10 space-y-5 hover:shadow-md'>
              <img src={cat.product_image} alt="" className='rounded-md w-80 h-72' />
              <div className='flex flex-row productDetails justify-between gap-x-40'>
                <div className='flex text-start flex-col space-y-5'>
                  <p className='text-xl bg-[#1F451A] rounded-md  gap-2 p-3 w-24 text-white'>{cat.brand?.label}</p>
                  <div className='text-2xl text-start capitalize text-[#1F451A] font-normal'>{cat.label}</div>
                  <div className=''>$ {cat.price}</div>
                </div>
                      
                <div className='p-5' >
                  <button className='flex justify-center items-center text-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-5 w-full'
                    onClick={() => addToCartHandler(cat)}>
                    <BsCart fontSize={28}/> Add to cart 
                  </button>
                </div>
              </div>
            </div> 
            <hr/>    
          </Link>
        ))}
      </div>
}
    </div>
  );
};

export default FlexStyle;
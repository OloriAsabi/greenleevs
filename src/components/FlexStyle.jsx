import React from 'react';
import { BsCart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { PostCart } from '../apis/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import Spinner from './Spinner';
import { addCartItem } from '../reducers/auth';

/* eslint-disable */

const FlexStyle = ({ filteredProducts , isLoading}) => {
  const { cart } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const addToCartHandler = async (e) => {
    const existItem = cart.cartItems.find((x) => x._id === e.product_id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
        if (e.countinStock < quantity) {
          toast.error('Sorry. Product is out of stock');
      return;
    }
    const body = {
      product_id: e.product_id,
      quantity: quantity,
    }
    PostCart(body)
      .then((res) => {
        dispatch(addCartItem(
            {
            _key: e.product_id,
            name: e.label,
            countInStock: e.countinStock,
            slug: e.slug,
            price: e.price,
            image: e.product_image,
            quantity,
          },
        ));
        if(res.data.status === 'success'){
           toast.success(`${e.product.label} added to the cart`);
        }else{
          toast.error(res.data.message);
        }
      })
  };
  return (
    <div>
       {isLoading
          ? 
          <Spinner /> 
          :
          <div>
       {filteredProducts.length === 0 ? (
            <div className='text-2xl text-center'>No Products Available</div>
            ) : (
      <div className='flex flex-col pl-5 gap-10 pt-10 justify-between w-full'>
        {filteredProducts.map((cat) => (
          <Link to={`/product/${cat.slug}`} key={cat.product_id}>
            <div className='w-full h-full accessoryBg flex flex-row md:justify-between items-center gap-10 p-10 space-y-5 hover:shadow-md'>
              <img src={cat.product_image} alt="" className='rounded-md w-80 h-72' />
              <div className='flex flex-row productDetails justify-between gap-x-40'>
                <div className='flex text-start flex-col space-y-5'>
                  <p className='text-xl bg-[#1F451A] rounded-md  gap-2 p-4 w-28 text-white'>{cat.brand?.label}</p>
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
          )}
          </div>
        }
    </div>
  );
};

export default FlexStyle;
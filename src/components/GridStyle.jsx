import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import React from 'react';
import { BsCart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { PostCart } from '../apis/api';
import { useDispatch } from 'react-redux';
import Spinner from './Spinner';
import { addCartItem } from '../reducers/auth';
/* eslint-disable */

const GridStyle = ({ isLoading, filteredProducts }) => {
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
      <div className='grid lg:grid-cols-3  md:grid-cols-2 pl-5 sm:grid-cols-2 gap-10 pt-10 md:justify-between items-center'>
        {filteredProducts.map((cat) => (
          <Link to={`/product/${cat.slug}`} key={cat.product_id}>
            <div className='w-full h-auto bg-white rounded-lg border flex flex-col justify-between p-5 space-y-5 hover:shadow-md'>
              <img src={cat.product_image} alt="" className='rounded-md w-full h-72' />
              <p className='text-xl bg-[#1F451A] rounded-md  gap-2 p-4 w-28 text-white'>{cat.brand?.label}</p>
              <div className='text-2xl text-start capitalize text-[#1F451A] font-normal'>{cat.label}</div>
              <div className=''>$ {cat.price}</div>
              <div className='p-5' >
                <button className='flex justify-center items-center text-center bg-[#1F451A] text-white cursor-pointer rounded-md  gap-2 p-3 w-full'
                onClick={() => addToCartHandler(cat)}>
                  <BsCart fontSize={28}/> Add to cart
                </button>
                </div>
            </div>     
          </Link>
        ))}
        </div>
      )}
            </div>
          }
    </div>
  );
};

export default GridStyle;
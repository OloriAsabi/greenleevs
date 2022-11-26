import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useParams } from 'react-router-dom';
import { EditProduct, getProductId } from '../apis/api';

const EditModal = ({ showModal, setShowModal }) => {
const [currentProduct, setCurrentProduct] = useState({
    product_id: null,
    label: "",
    product_image: "",
    price: "",
    quantity: ""
});
const { enqueueSnackbar } = useSnackbar();
const [message, setMessage] = useState("");
const { id }  = useParams();

const getProduct = (id) => {
    getProductId(id).then(response => {
        // setCurrentProduct(response.data)
        console.log(response.data);
    })
    .catch(e => {
        console.log(e);
      });
}

useEffect(() => {
    getProduct(id);
  }, [id]);


//   const handleInputChange = event => {
//     const { name, value } = event.target;
//     setCurrentProduct({ ...currentProduct, [name]: value });
//   };

//   const updateProduct = () => {
//     EditProduct(currentProduct.id, currentProduct)
//       .then(response => {
//         console.log(response.data);
//         setMessage("Product is updated successfully!");
//         enqueueSnackbar("Product is updated successfully!", { variant: 'success' });
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   };

  return (
    <>
    {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 backdrop-blur-sm outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex justify-between gap-5 p-5 border-b border-solid border-gray-300 rounded-t ">
                <div className="items-start">
                         <h3 className="text-xl pb-2 font=semibold">Edit product</h3>
                </div>
                  <button
                    className="bg-transparent border-0 text-red-500 text-end"
                    onClick={() => setShowModal(false)}
                   >
                    <FaTimes className="cursor-pointer" fontSize={20}/>
                  </button>
            </div>

            <div>
                {/* {currentProduct} */}
            </div>
            </div>
            </div>
            </div>
            </>
      ) : 
      null}    
    </>
  )
}

export default EditModal
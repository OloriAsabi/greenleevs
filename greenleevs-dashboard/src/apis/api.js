import axios from "axios";

const token =  localStorage.getItem("token");

export const LoginUser = async (body) => {
    try {
    const data = await axios.post(`${process.env.REACT_APP_BASEURL}/v1/login`, body,  {
        headers: { 
            "Content-Type": "application/json" ,
        },
      })
     return data; 
    } catch (error) {
        console.log(error)  
    }
};

export const RegisterUser = async (body) => {
    try {
      const data = await axios.post(`${process.env.REACT_APP_BASEURL}/v1/register`, body,
          {
            headers: { 
                "Content-Type": "application/json" ,
            },
          })
        console.log("Register Data",data);
         return data; 
        } catch (error) {
            console.log(error)  
        }
  };

export const LogoutUser = async () => {
    try {
        const data = await axios.post(`${process.env.REACT_APP_BASEURL}/v1/logout`,
          {
            Headers: {
                authorization: token
            }
          })
    return data; 
        } catch (error) {
            console.log(error)  
        }
};

export const UpdateUser = async (body) => {
    try {
        const data = await axios.post(`${process.env.REACT_APP_BASEURL}/v1/user`, body,
          {
            Headers: {
                authorization: token
            }
          })
    return data; 
        } catch (error) {
            console.log(error)  
        }
};

export const UserForgotPassword = async (body) => {
    try {
        const data = await axios.post(`${process.env.REACT_APP_BASEURL}/v1/password/forgot`, body)
    return data; 
        } catch (error) {
            console.log(error)  
        }
};

export const UserResetPassword = async (body) => {
    try {
      const data = await axios.post(`${process.env.REACT_APP_BASEURL}/v1/password/reset`, body,
          {
            headers: { 
                "Content-Type": "application/json" ,
            },
          })
        console.log("Register Data",data);
         return data; 
        } catch (error) {
            console.log(error)  
        }
  };

  export const GetOrders = async () => {
    try {
        const data = await axios.get(`${process.env.REACT_APP_BASEURL}/v1/admin/orders`,
            {
              headers: { 
                  "Content-Type": "application/json" ,
                  "Authorization": `Bearer ${token}`
              },
            })
          console.log("Get Orders",data);
           return data; 
          } catch (error) {
              console.log(error)  
          }
  }

  export const UpdateOrderStatus = async (body) => {
    try {
        const data = await axios.post(`${process.env.REACT_APP_BASEURL}/v1/admin/order`, body,
            {
              headers: { 
                  "Content-Type": "application/json" ,
              },
            })
          console.log("Update Order Status",data);
           return data; 
          } catch (error) {
              console.log(error)  
          }
  }
  export const CreateProducts = async (body) => {
    try {
        const data = await axios.post(`${process.env.REACT_APP_BASEURL}/v1/admin/product`, body,
            {
              headers: { 
                  "Content-Type": "application/json" ,
                  "Authorization": `Bearer ${token}`
              },
            })
          console.log("Create Products",data);
           return data; 
          } catch (error) {
              console.log(error)  
          }
  }

  export const GetProducts = async () => {
    try {
        const data = await axios.get(`${process.env.REACT_APP_BASEURL}/v1/admin/products`, 
            {
              headers: { 
                  "Content-Type": "application/json" ,
                  "Authorization": `Bearer ${token}`
              },
            })
          console.log("Get Products",data);
           return data; 
          } catch (error) {
              console.log(error)  
          }
  }


export const getProductId = (id) => {
  try {
      const req = axios.get(`${process.env.REACT_APP_BASEURL}/v1/admin/product/?sku=${id}`,  {
        headers: { 
            "Content-Type": "application/json" ,
            "Authorization": `Bearer ${token}`
        },
      });

      console.log("Details", req);
      return req;
  } catch (error) {
      console.log(error)  
  }
}

export const EditProduct = async ({id, body}) => {
    try {
        const data = await axios.post(`${process.env.REACT_APP_BASEURL}/v1/admin/product/${id}/edit`, body,
            {
              headers: { 
                  "Content-Type": "application/json" ,
                  "Authorization": `Bearer ${token}`
              },
            })
          console.log("Edit Product",data);
           return data; 
          } catch (error) {
              console.log(error)  
          }
  }
  export const DeleteProduct = async (id) => {
    try {
        const data = await axios.get(`${process.env.REACT_APP_BASEURL}/v1/admin/product/${id}/delete`,
            {
              headers: { 
                  "Content-Type": "application/json" ,
                  "Authorization": `Bearer ${token}`
              },
            })
          console.log("Edit Product",data);
           return data; 
          } catch (error) {
              console.log(error)  
          }
  }
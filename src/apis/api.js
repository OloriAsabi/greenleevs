import axios from 'axios';
/* eslint-disable */

const token =  localStorage.getItem("token");


export const LoginUser = async (body) => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASEURL}/login`, body, {
      headers: { 
        'Content-Type': 'application/json' ,
      },
    });
    return data; 
  } catch (error) {
    console.log(error);  
  }
};

export const RegisterUser = async (body) => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASEURL}/register`, body,
      {
        headers: { 
          'Content-Type': 'application/json' ,
        },
      });
    console.log('Register Data',data);
    return data; 
  } catch (error) {
    console.log(error);  
  }
};

export const LogoutUser = async () => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASEURL}/logout`,
      // {
      //   Headers: {
      //     authorization: localStorage.getItem('token')
      //   }
      // }
      {
        headers: { 
            "Content-Type": "application/json" ,
            "Authorization": `Bearer ${token}`
        },
      });
    return data; 
  } catch (error) {
    console.log(error);  
  }
};

export const UpdateUser = async (body) => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASEURL}/user`, body,
    {
      headers: { 
          "Content-Type": "application/json" ,
          "Authorization": `Bearer ${token}`
      },
    });
    return data; 
  } catch (error) {
    console.log(error);  
  }
};

export const UserForgotPassword = async (body) => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASEURL}/password/forgot`, body);
    return data; 
  } catch (error) {
    console.log(error);  
  }
};

export const UserResetPassword = async (body) => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASEURL}/password/reset`, body,
      {
        headers: { 
          'Content-Type': 'application/json' ,
        },
      });
    console.log('Register Data',data);
    return data; 
  } catch (error) {
    console.log(error);  
  }
};

export const GetProducts = async () => {
  try {
      const data = await axios.get(`${process.env.REACT_APP_BASEURL}/products`, 
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

export const GetCategories = async () => {
  try {
      const data = await axios.get(`${process.env.REACT_APP_BASEURL}/admin/categories`, 
          {
            headers: { 
                "Content-Type": "application/json" ,
                "Authorization": `Bearer ${token}`
            },
          })
        console.log("Get categories",data);
         return data; 
        } catch (error) {
            console.log(error)  
        }
}

export const PostNewsletter = async (body) => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASEURL}/subscribe`, body,
      {
        headers: { 
          'Content-Type': 'application/json' ,
        },
      });
    console.log('News letter',data);
    return data; 
  } catch (error) {
    console.log(error);  
  }
  
}
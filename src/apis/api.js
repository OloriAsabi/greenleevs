import axios from "axios";

export const LoginUser = async (body) => {
    try {
    const data = await axios.post(`${process.env.REACT_APP_BASEURL}/login`, body,  {
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
      const data = await axios.post(`${process.env.REACT_APP_BASEURL}/register`, body,
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
        const data = await axios.post(`${process.env.REACT_APP_BASEURL}/logout`,
          {
            Headers: {
                authorization: localStorage.getItem("token")
            }
          })
    return data; 
        } catch (error) {
            console.log(error)  
        }
};

export const UpdateUser = async (body) => {
    try {
        const data = await axios.post(`${process.env.REACT_APP_BASEURL}/user`, body,
          {
            Headers: {
                authorization: localStorage.getItem("token")
            }
          })
    return data; 
        } catch (error) {
            console.log(error)  
        }
};

export const UserForgotPassword = async (body) => {
    try {
        const data = await axios.post(`${process.env.REACT_APP_BASEURL}/password/forgot`, body)
    return data; 
        } catch (error) {
            console.log(error)  
        }
};

export const UserResetPassword = async (body) => {
    try {
      const data = await axios.post(`${process.env.REACT_APP_BASEURL}/password/reset`, body,
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
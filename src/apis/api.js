import axios from 'axios';
/* eslint-disable */

const token =  localStorage.getItem("token");
const cancelToken = axios.CancelToken.source();


export const LoginUser = async (body) => {
    try {
      const data = await axios.post(`${process.env.REACT_APP_BASEURL}/login`, body, {
        headers: { 
          'Content-Type': 'application/json' ,
        },
        cancelToken: cancelToken.token,
      });
      return data; 
    } catch (error) {
      if (axios.isCancel(err)) {
        console.log("Request canceled!");
      } else {
        console.log(error);
      }
    }
  
    return () => {
      cancelToken.cancel();
    };
  }

export const RegisterUser = async (body) => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASEURL}/register`, body,
      {
        headers: { 
          'Content-Type': 'application/json' ,
        },
        cancelToken: cancelToken.token,
      });
    console.log('Register Data',data);
    return data; 
  } catch (error) {
    if (axios.isCancel(err)) {
      console.log("Request canceled!");
    } else {
      console.log(error);
    }
  }

  return () => {
    cancelToken.cancel();
  };
};

export const LogoutUser = async () => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASEURL}/logout`,
      {
        headers: { 
            "Content-Type": "application/json" ,
            "Authorization": `Bearer ${token}`
        },
        cancelToken: cancelToken.token,
      });
    return data; 
  } catch (error) {
    if (axios.isCancel(err)) {
      console.log("Request canceled!");
    } else {
      console.log(error);
    }
  }

  return () => {
    cancelToken.cancel();
  };
};

export const UpdateUser = async (body) => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASEURL}/user`, body,
    {
      headers: { 
          "Content-Type": "application/json" ,
          "Authorization": `Bearer ${token}`
      },
      cancelToken: cancelToken.token,
    });
    return data; 
  } catch (error) {
    if (axios.isCancel(err)) {
      console.log("Request canceled!");
    } else {
      console.log(error);
    } 
  }
  return () => {
    cancelToken.cancel();
  };
};

export const UserForgotPassword = async (body) => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASEURL}/password/forgot`,
    {
      cancelToken: cancelToken.token
    }, body);
    return data; 
  } catch (error) {
    if (axios.isCancel(err)) {
      console.log("Request canceled!");
    } else {
      console.log(error);
    }
  }
  return () => {
    cancelToken.cancel();
  };
};

export const UserResetPassword = async (body) => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASEURL}/password/reset`, body,
      {
        headers: { 
          'Content-Type': 'application/json' ,
        },
        cancelToken: cancelToken.token,
      });
    console.log('Register Data',data);
    return data; 
  } catch (error) {
    if (axios.isCancel(err)) {
      console.log("Request canceled!");
    } else {
      console.log(error);
    }
  }
  return () => {
    cancelToken.cancel();
  };
};

export const GetProducts =  async () => {
  try {
      const data = await axios.get(`${process.env.REACT_APP_BASEURL}/products`,
       
          {
            headers: { 
                "Content-Type": "application/json" ,
                "Authorization": `Bearer ${token}`
            },
            cancelToken: cancelToken.token,
          })
        // console.log("Get Products",data);
         return data; 
        } catch (error) {
          if (axios.isCancel(err)) {
            console.log("Request canceled!");
          } else {
            console.log(error);
          }
        }

    return () => {
      cancelToken.cancel();
    };
}
export const GetProductId = (id) => {
  try {
      const req = axios.get(`${process.env.REACT_APP_BASEURL}/products/${id}`,  {
        headers: { 
            "Content-Type": "application/json" ,
            "Authorization": `Bearer ${token}`
        },
      });

      console.log("Products By Id", req);
      return req;
  } catch (error) {
      console.log(error)  
  }
}


export const GetCategories = async () => {
  try {
      const data = await axios.get(`${process.env.REACT_APP_BASEURL}/categories`, 
          {
            headers: { 
                "Content-Type": "application/json" ,
                "Authorization": `Bearer ${token}`
            },
            cancelToken: cancelToken.token,
          })
        console.log("Get categories",data);
         return data; 
        } catch (error) {
          if (axios.isCancel(err)) {
            console.log("Request canceled!");
          } else {
            console.log(error);
          }
        }
        return () => {
          cancelToken.cancel();
        };
}
export const GetCategoriesById = async (id) => {
  try {
      const data = await axios.get(`${process.env.REACT_APP_BASEURL}/categories/${id}`, 
          {
            headers: { 
                "Content-Type": "application/json" ,
                "Authorization": `Bearer ${token}`
            },
            cancelToken: cancelToken.token,
          })
        console.log("Get Categories By Id",data);
         return data; 
        } catch (error) {
          if (axios.isCancel(err)) {
            console.log("Request canceled!");
          } else {
            console.log(error);
          }
        }
        return () => {
          cancelToken.cancel();
        };
}

export const PostNewsletter = async (body) => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASEURL}/subscribe`, body,
      {
        headers: { 
          'Content-Type': 'application/json' ,
        },
        cancelToken: cancelToken.token,
      })
    console.log('News letter',data);
    return data; 
  } catch (error) {
    if (axios.isCancel(err)) {
      console.log("Request canceled!");
    } else {
      console.log(error);
    }
  } 
  return () => {
    cancelToken.cancel();
  };
}

export const GetCart = async (user) => {
  try {
      const data = await axios.get(`${process.env.REACT_APP_BASEURL}/${user}/cart`, 
          {
            headers: { 
                "Content-Type": "application/json" ,
                "Authorization": `Bearer ${token}`
            },
            cancelToken: cancelToken.token,
          })
        console.log("Get cart",data);
         return data; 
        } catch (error) {
          if (axios.isCancel(err)) {
            console.log("Request canceled!");
          } else {
            console.log(error);
          }
        }
        return () => {
          cancelToken.cancel();
        };
}

export const PostCart = async (user, body) => {
  try {
      const data = await axios.get(`${process.env.REACT_APP_BASEURL}/${user}/cart`, 
      body,
          {
            headers: { 
                "Content-Type": "application/json" ,
                "Authorization": `Bearer ${token}`
            },
            cancelToken: cancelToken.token,
          })
        console.log("Get cart",data);
         return data; 
        } catch (error) {
          if (axios.isCancel(err)) {
            console.log("Request canceled!");
          } else {
            console.log(error);
          }
        }
        return () => {
          cancelToken.cancel();
        };
}
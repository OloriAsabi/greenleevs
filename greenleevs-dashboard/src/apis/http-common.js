import axios from "axios";

const token =  localStorage.getItem("token");

export default axios.post({
  baseURL:`${process.env.REACT_APP_BASEURL}/admin`,
  headers: {
    "Content-type": "application/json",
    "Authorization" : `Bearer ${token}`
  }
});

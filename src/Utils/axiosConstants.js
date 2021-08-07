import axios from "axios";
import Config from "./config";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cookie from "react-cookies";

var url = Config.BASE_URL;

axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
  "Authorization"
)}`;
const instance = axios.create({
  baseURL: url,
  params: {},
  data: {},
});

instance.interceptors.request.use(function (request) {
  if (!request.url.includes("login")) {
    request.headers["Authorization"] = cookie.load("Authorization");
  }
  return request;
});

instance.interceptors.response.use(

  function (response) {
    // console.log(response, "inter")
    if (response.status === 200 && response?.config?.url?.includes("sales-report"))
      return response.data
    else if (response.status === 200 && response.data.status) {
      if (
        response?.data?.code === 200 &&
        response?.config?.url?.includes("login")
      ) {
        toast.success(response?.data?.message);
      }
      return response.data;
    } else if (response.status === 200 && !response.data.status) {
      let error = response?.data?.error || response?.data?.message;
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return Promise.reject(response?.data?.error);
    } else {
      console.log(response);
    }
  },
  function (error) {
    console.log(error);
    // let trueError = "";
    // if (error?.response?.status !== 404) {
    //   if (error?.response?.data?.message === "Bearer Token not found")
    //     window.location.href = "/";
    //   else {
    //     const errors = error?.response?.data?.error ?? {};
    //     const errorName = Object.keys(errors);
    //     console.log(typeof errors);
    //     if (typeof errors === "object" && errorName.length > 0) {
    //       trueError = trueError + errors[errorName[0]][0];
    //     } else {
    //       trueError = error?.response?.data?.message;
    //     }
    //     toast.error(trueError, {
    //       position: "top-right",
    //       autoClose: 3000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //     });
    //   }
    // } else if (
    //   error?.response?.status === 404 &&
    //   error?.response?.config?.url?.includes("login")
    // ) {
    //   toast.error(error?.response?.data?.message);
    // }
    return Promise.reject(error);
  }
);

export default instance;

import axios, { AxiosHeaders } from "axios";
import { toast } from "react-toastify";

import { API_URL } from "../constants/api.constant";
let refresh = false;

axios.defaults.headers.common["Authorization"] =
  sessionStorage.getItem("token") || "";
axios.defaults.baseURL = API_URL;
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error = ", error);
    console.log(error.code, error.message);
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message);
    }
    if ([404, 403].includes(error.response.status) && !refresh) {
      toast.error(error.response.data.message);
      // refresh = false;
      // const response = await axios.get("auth/refresh", {
      //   withCredentials: true,
      // });
      // console.log(response);
      // if (response.status === 200) {
      //   axios.defaults.headers.common["Authorization"] =
      //     response.data.data.token;
      //   refresh = false;
      //   return axios(error.config);
      // }
    }
    throw error;
  }
);

// axios.interceptors.request.use((request) => {

//   return request;
// });

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
export default httpService;

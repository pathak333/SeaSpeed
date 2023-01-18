import axios from "axios";

import { API_URL } from "../constants/api.constant";
let refresh = false;
axios.defaults.baseURL = API_URL;
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if ([404, 403].includes(error.response.status) && !refresh) {
      refresh = true;
      const response = await axios.get("auth/refresh", {
        withCredentials: true,
      });
      if (response.status === 200) {
        axios.defaults.headers.common["Authorization"] =
          response.data.data.token;
        refresh = false;
        return axios(error.config);
      }
    }
    throw error;
  }
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
export default httpService;

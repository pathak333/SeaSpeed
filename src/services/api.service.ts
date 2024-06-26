import axios from "axios";
import { toast } from "react-toastify";
// import { useGlobalState } from "../contexts/global.context";
// import { LOADING } from "../constants/action.constant";



let refresh = false;

const pendingRequests = new Map();



 axios.defaults.headers.common["Authorization"] =
  sessionStorage.getItem("token") || "";
   axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;//API_URL;


  

 axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    
    console.log("error = ", error);
    console.log(error.code, error.message);
    if (error.code === "ERR_CANCELED") {
      return {data:null}
    }
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message);
      
    }
    if (!error.response && error.code !== "ERR_CANCELED") {
      toast.error('No Network....',{toastId: "Neterror"});
    }
    if (error.response && [404, 403].includes(error.response.status) && !refresh) {
     
      toast.error(error.response.data.message, { toastId: "error" });
     
     
     
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
    if (error.response && [401].includes(error.response.status)) { 
      toast.error(error.response.data.message);
        sessionStorage.clear()
         window.location.reload();
    
     
    }
    if (error.response && [422].includes(error.response.status)) { 
      toast.error(error.response.data.message);
     
    }
    throw error;
  }
);

axios.interceptors.request.use((request) => {

  if (pendingRequests.has(request.url)) {
    // Duplicate request, cancel the previous one
    console.log("url cancel = ",request.url);
    
    pendingRequests.get(request.url).abort();
  }

  const newAbortController = new AbortController();
  pendingRequests.set(request.url, newAbortController);
  setTimeout(() => {
    pendingRequests.delete(request.url);
  }, 1000);
  
  
  request.signal = newAbortController.signal;


  
  return request;
});

const httpService = {
  get:  axios.get,
  post:  axios.post,
  put:  axios.put,
  patch:  axios.patch,
  delete:  axios.delete,
};
export default httpService;

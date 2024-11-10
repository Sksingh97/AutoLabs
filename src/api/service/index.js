import axios from 'axios';
import { BASE_URL } from '../constants';
import { showTost } from '../../utils/helper';
const request = axios.create({
  baseURL: BASE_URL,
});

const skipToken = ["/temp/users", "/signup", "/login", "/verify"]
request.interceptors.request.use(
  (config) => {
    console.log(`\n${config.method.toUpperCase()} \nRequest EndPoint: ${config.baseURL}${config.url}\n Data: %j`, config.data)
    if(!skipToken.includes(config.url)){
      config.headers.Authorization = 'Bearer YOUR_AUTH_TOKEN';
    }
    return config;
  },
  (error) => {
    showTost({type:"success", header: "Success", message: error})
    return Promise.reject(error);
  },
);

// Response interceptor
request.interceptors.response.use(
    (response) => {
      showTost({type:"success", header: "Success", message: response.data.message})
      return response;
    },
    (error) => {
      console.log("Response ERROR : %j", JSON.stringify(error))
      if (error.response) {
        showTost({type:"error", header: "Error1", message: error.response.data})
      } else if (error.request) {
        showTost({type:"error", header: "Error2", message: "Error"})
      } else {
        showTost({type:"error", header: "Error3", message: "Error"})
      }
  
      return Promise.reject(error);
    }
  );
export default request;
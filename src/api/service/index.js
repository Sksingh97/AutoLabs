import axios from 'axios';
import { BASE_URL, DEVICE_URL } from '../constants';
import { showTost } from '../../utils/helper';
import StorageService from '../../services/localStorageService';
import { USER_DETAILS_KEY } from '../../utils/constants';
import dispatchService from '../../store/dispatcherService';
import { LOG_OUT_USER, refreshTokenRequest } from '../../store/actions/authAction';
const request = axios.create({
  baseURL: BASE_URL,
});

const deviceRequest = axios.create({
  baseURL: DEVICE_URL,
});

const skipToken = ["/temp/users/", "/signup/", "/login", "/verify", "/refresh/token"]
const requestInterceptor = async (config) => {
  console.log(`\n${config.method.toUpperCase()} \nRequest EndPoint: ${config.baseURL}${config.url}\n Data: %j`, config.data)
  if(!skipToken.includes(config.url)){
    const authData = await StorageService.getData(USER_DETAILS_KEY)
    config.headers.Authorization = `Bearer ${authData.token}`;
  }
  console.log("CONFIG :: ", config.headers)
  return config;
}
const allowedPath = ["/save-config", "reset", "/health"]
const deviceRequestInterceptor = async (config) => {
  console.log(`\n${config.method.toUpperCase()} \nRequest EndPoint: ${config.baseURL}${config.url}\n Data: %j`, config.data)
  if(!allowedPath.includes(config.url)){
    config.cancelToken = new axios.CancelToken((cancel) => {
      cancel("Request Cancel")});
      showTost({type:"error", header: "Error", message: "Request Not Allowed"})
  }
  console.log("CONFIG :: ", config.headers)
  return config;
}

const requestError = (error) => {
  showTost({type:"success", header: "Success", message: error})
  return Promise.reject(error);
}
request.interceptors.request.use(requestInterceptor, requestError);
deviceRequest.interceptors.request.use(deviceRequestInterceptor, requestError);

const skipToastPaths = ['/appliance/publish/'];

const responseInterceptor = (response) => {
  // Skip toast for specific endpoints
  if (!skipToastPaths.includes(response.config.url)) {
    showTost({type:"success", header: "Success", message: response.data.message})
  }
  console.log("RESPONSE : :: ", response.data)
  return response.data;
}

const responseError = async (error) => {
  if(error?.response?.status == 401){
  }
  if (error.response) {
    showTost({type:"error", header: "Error1", message: error.response.data})
  } else if (error.request) {
    console.log(error.request)
    showTost({type:"error", header: "Error2", message: error.request})
  } else {
    showTost({type:"error", header: "Error3", message: error.request})
  }

  return Promise.reject(error);
}
// Response interceptor
request.interceptors.response.use(responseInterceptor, responseError);
deviceRequest.interceptors.response.use(responseInterceptor, responseError);
export {deviceRequest};
export default request;

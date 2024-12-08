import axios from 'axios';
import { BASE_URL } from '../constants';
import { showTost } from '../../utils/helper';
import StorageService from '../../services/localStorageService';
import { USER_DETAILS_KEY } from '../../utils/constants';
import dispatchService from '../../store/dispatcherService';
import { LOG_OUT_USER, refreshTokenRequest } from '../../store/actions/authAction';
const request = axios.create({
  baseURL: BASE_URL,
});

const skipToken = ["/temp/users/", "/signup/", "/login", "/verify", "/refresh/token"]
request.interceptors.request.use(
  async (config) => {
    console.log(`\n${config.method.toUpperCase()} \nRequest EndPoint: ${config.baseURL}${config.url}\n Data: %j`, config.data)
    if(!skipToken.includes(config.url)){
      const authData = await StorageService.getData(USER_DETAILS_KEY)
      config.headers.Authorization = `Bearer ${authData.token}`;
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
      console.log("RESPONSE : :: ", response.data)
      return response.data;
    },
    async (error) => {
      if(error?.response?.status == 401){

        const authData = await StorageService.getData(USER_DETAILS_KEY)
        dispatchService.dispatch(refreshTokenRequest(authData))
        const newData = await StorageService.getData(USER_DETAILS_KEY)

        // 3. Update the failed request config with the new token
        console.log("\n\n\n\n\n\n\n\n\n\n\n old Token : ",authData.token)
        console.log("\n\n\n\n\n\n\n\n\n\n\n new Token : ",newData.token)
        error.config.headers['Authorization'] = `Bearer ${newData.token}`;
        // 4. Retry the failed request with the new token
        // return request(error.config);
        // dispatchService.dispatch({ type: LOG_OUT_USER, payload: {} })
      }
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
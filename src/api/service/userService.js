import {GET_USER} from "../constants"
import request from './index';
export const GetUserDetails = async () => {
    try {
      const response = await request.get(GET_USER);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
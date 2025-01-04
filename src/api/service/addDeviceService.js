import { DEVICE_TYPE } from "../constants";
import request from './index';

export const GetAllDeviceType = async (data) => {
    try {
      const response = await request.get(DEVICE_TYPE);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
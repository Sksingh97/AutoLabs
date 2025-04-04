import { DEVICE, DEVICE_TYPE, DEVICE_CONFIG_SEND } from "../constants";
import request, {deviceRequest} from './index';

export const GetAllDeviceType = async (data) => {
    try {
      const response = await request.get(DEVICE_TYPE);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const CreateDevice = async (data) => {
  try {
    const response = await request.post(DEVICE, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const SendDeviceConfig = async (data) => {
  try {
    const response = await deviceRequest.post(DEVICE_CONFIG_SEND, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
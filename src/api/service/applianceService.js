import { APPLIANCE_ENDPOINTS } from "../constants";
import request from './index';

export const publishApplianceOperation = async (data) => {
  try {
    console.log("PUBLISH PAYLOAD : ",data);
    const response = await request.post(APPLIANCE_ENDPOINTS.PUBLISH, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

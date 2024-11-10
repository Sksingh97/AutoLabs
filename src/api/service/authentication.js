import request from './index';
import { SIGN_UP, VERIFY_OTP, SEND_OTP } from '../constants'; 


export const SendOTP = async (data) => {
  try {
    const response = await request.post(SEND_OTP, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const CreateAccount = async (data) => {
  try {
    const response = await request.post(SIGN_UP, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const VerifyOTP = async (data) => {
  try {
    const response = await request.post(VERIFY_OTP, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

import request from './index';
import { TEMP_USER_CREATE, SIGNUP_VERIFY_OTP, SEND_OTP, LOGIN, REFRESH_TOKEN } from '../constants'; 

//Signup Step 1
export const CreateTempUser = async (data) => {
  try {
    const response = await request.post(TEMP_USER_CREATE, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const SendLoginOTP = async (data) => {
  try {
    const response = await request.post(SEND_OTP, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};




export const SignupVerifyOTP = async (data) => {
  try {
    const response = await request.post(SIGNUP_VERIFY_OTP, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const LoginVerifyOTP = async (data) => {
  try {
    const response = await request.post(LOGIN, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const RefreshToken = async (data) => {
  try {
    console.log("REQUEST DATA : : : ", data)
    const response = await request.post(REFRESH_TOKEN, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

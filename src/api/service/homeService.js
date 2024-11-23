import request from './index';
import { HOME } from '../constants'; 

//Signup Step 1
export const CreateHome = async (data) => {
  try {
    const response = await request.post(HOME, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllHomes = async (data) => {
  try {
    const response = await request.get(HOME);
    return response.data;
  } catch (error) {
    throw error;
  }
};
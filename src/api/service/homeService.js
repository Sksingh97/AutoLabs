import request from './index';
import { HOME, HOME_DETAILS } from '../constants'; 

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

export const GetHomeDetails = async (id) => {
  try {
    const response = await request.get(HOME_DETAILS.replace('{HOME_ID}', id));
    return response.data;
  } catch (error) {
    throw error;
  }
};


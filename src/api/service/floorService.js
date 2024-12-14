import request from './index';
import { FLOOR, FLOOR_LIST } from '../constants'; 

//Signup Step 1
export const CreateFloor = async (data) => {
  try {
    const response = await request.post(FLOOR, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllFloors = async (data) => {
  try {
    const response = await request.get(FLOOR_LIST.replace('{HOME_ID}', data.id));
    return response.data;
  } catch (error) {
    throw error;
  }
};
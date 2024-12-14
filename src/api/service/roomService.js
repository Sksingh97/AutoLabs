import request from './index';
import { ROOM, ROOM_LIST } from '../constants'; 

//Signup Step 1
export const CreateRoom = async (data) => {
  try {
    const response = await request.post(ROOM, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllRooms = async (data) => {
  try {
    const response = await request.get(ROOM_LIST.replace('{FLOOR_ID}', data.id));
    return response.data;
  } catch (error) {
    throw error;
  }
};
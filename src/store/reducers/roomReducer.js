import { CREATE_ROOM_SUCCESS, GET_ROOM_SUCCESS, CREATE_ROOM_FAILURE, RESET_ROOMS } from '../actions/roomAction'

const initialRoomState = {
    data: [],
    error: null,
  };
  
  export const roomReducer = (state = initialRoomState, action) => {
    console.log("Room Reducer: %j", action)
    switch (action.type) {
      case CREATE_ROOM_SUCCESS:
        return { ...state, data: [...state.data,{id:action.payload.id, name:action.payload.name, is_active: true}] };
      case GET_ROOM_SUCCESS:
        return { ...state, data: [...action.payload] };
      case CREATE_ROOM_FAILURE:
        return { ...state, error: action.payload };
      case RESET_ROOMS:
        return { ...initialRoomState}
      default:
        return state;
    }
  };
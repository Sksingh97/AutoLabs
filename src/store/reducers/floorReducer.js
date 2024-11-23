import { CREATE_FLOOR_SUCCESS, GET_FLOOR_SUCCESS, CREATE_FLOOR_FAILURE } from '../actions/floorAction'

const initialFloorState = {
    data: [],
    error: null,
  };
  
  export const floorReducer = (state = initialFloorState, action) => {
    console.log("Floor Reducer: %j", action)
    switch (action.type) {
      case CREATE_FLOOR_SUCCESS:
        return { ...state, data: [...state.data,{id:action.payload.id, name:action.payload.name}] };
      case GET_FLOOR_SUCCESS:
        return { ...state, data: [...action.payload] };
      case CREATE_FLOOR_FAILURE:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
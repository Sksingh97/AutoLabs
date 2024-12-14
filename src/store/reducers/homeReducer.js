import { CREATE_HOME_SUCCESS, CREATE_HOME_FAILURE, GET_HOME_SUCCESS, GET_HOME_FAILURE } from "../actions/homeActions"

const initialHomeState = {
    data: [],
    error: null,
  };
  
  export const homeReducer = (state = initialHomeState, action) => {
    console.log("Home Reducer: %j", action)
    switch (action.type) {
      case CREATE_HOME_SUCCESS:
        return { ...state, data: [...state.data,{id:action.payload.id, name:action.payload.name}] };
      case GET_HOME_SUCCESS:
        return { ...state, data: [...action.payload] };
      case CREATE_HOME_FAILURE:
      case GET_HOME_FAILURE:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
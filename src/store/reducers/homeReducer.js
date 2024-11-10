import { HOME_SUCCESS, HOME_FAILURE } from "../actions/homeActions"

const initialHomeState = {
    data: [],
    error: null,
  };
  
  export const homeReducer = (state = initialHomeState, action) => {
    switch (action.type) {
      case HOME_SUCCESS:
        return { ...state, data: action.payload };
      case HOME_FAILURE:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
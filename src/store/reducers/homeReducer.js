import { CREATE_HOME_SUCCESS, CREATE_HOME_FAILURE, GET_HOME_SUCCESS, GET_HOME_FAILURE, GET_HOME_DETAILS_SUCCESS, getHomeDetailsFail, GET_HOME_DETAILS_FAILURE } from "../actions/homeActions"

const initialHomeState = {
    homes: [],
    homeDetials:[],
    error: null,
  };
  
  export const homeReducer = (state = initialHomeState, action) => {
    console.log("Home Reducer: %j", action)
    switch (action.type) {
      case CREATE_HOME_SUCCESS:
        return { ...state, homes: [...state.homes,{id:action.payload.id, name:action.payload.name}] };
      case GET_HOME_SUCCESS:
        return { ...state, homes: [...action.payload] };
      case GET_HOME_DETAILS_SUCCESS:
        return {...state, homeDetials: action.payload};
      case GET_HOME_DETAILS_FAILURE:
      case CREATE_HOME_FAILURE:
      case GET_HOME_FAILURE:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
import { CREATE_HOME_SUCCESS, CREATE_HOME_FAILURE, GET_HOME_SUCCESS, GET_HOME_FAILURE, GET_HOME_DETAILS_SUCCESS, getHomeDetailsFail, GET_HOME_DETAILS_FAILURE, UPDATE_APPLIANCE_VALUE, TOGGLE_FAVORITE_APPLIANCE, SET_FAVORITE_APPLIANCES } from "../actions/homeActions"

const initialHomeState = {
    homes: [],
    homeDetials:[],
    favoriteApplianceIds: [],
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
      case UPDATE_APPLIANCE_VALUE:
        return {
          ...state,
          homeDetials: state.homeDetials.map(floor => ({
            ...floor,
            rooms: floor.rooms.map(room => ({
              ...room,
              appliance: room.appliance.map(app => 
                app.id === action.payload.applianceId 
                  ? { ...app, value: action.payload.value }
                  : app
              )
            }))
          }))
        };
      case TOGGLE_FAVORITE_APPLIANCE:
        return {
          ...state,
          favoriteApplianceIds: state.favoriteApplianceIds.includes(action.payload)
            ? state.favoriteApplianceIds.filter(id => id !== action.payload)
            : [...state.favoriteApplianceIds, action.payload]
        };
      case SET_FAVORITE_APPLIANCES:
        return {
          ...state,
          favoriteApplianceIds: Array.isArray(action.payload) ? action.payload : []
        };
      case GET_HOME_DETAILS_FAILURE:
      case CREATE_HOME_FAILURE:
      case GET_HOME_FAILURE:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
import {SIGNUP_VERIFY_SUCCESS, 
  SIGNUP_VERIFY_FAILURE, 
  CREATE_TEMP_USER_FAILURE, 
  CREATE_TEMP_USER_SUCCESS,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE,
  LOGIN_VERIFY_SUCCESS,
  LOAD_USER_DATA_FROM_STORE,
  LOG_OUT_USER,
  REFRESH_TOKEN_SUCCESS
} from "../actions/authAction"

const initialAuthState = {
    ref_token: null,
    message: null,
    error: null,
    login_step: 0,
    name: null,
    mobile_number: null,
    is_admin:false,
    language:'en'
  };
  
  export const authReducer = (state = initialAuthState, action) => {
    console.log("Auth Reducer: %j", action)
    switch (action.type) {
      case CREATE_TEMP_USER_SUCCESS:
        return { ...state, ...action.payload};
      case SIGNUP_VERIFY_SUCCESS:
      case LOGIN_VERIFY_SUCCESS:
      case REFRESH_TOKEN_SUCCESS:
        return { ...state, token: action.payload.access_token, ref_token: action.payload.refresh_token};
      case GET_USER_DETAILS_SUCCESS:
        return { ...state, ...action.payload};
      case LOAD_USER_DATA_FROM_STORE:
        return {...state, ...action.payload}
      case CREATE_TEMP_USER_FAILURE:
      case SIGNUP_VERIFY_FAILURE:
      case GET_USER_DETAILS_FAILURE:
        return { ...state, error: action.payload };
      case LOG_OUT_USER:
        return {...initialAuthState}
      default:
        return state;
    }
  };
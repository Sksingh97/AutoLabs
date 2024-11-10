import {AUTH_SUCCESS, AUTH_FAILURE, OTP_VERIFY_FAILURE, OTP_VERIFY_SUCCESS, LOAD_USER_DETAILS_SUCCESS} from "../actions/authAction"

const initialAuthState = {
    message: null,
    error: null,
    token: null,
    ref_token: null,
    loginStep: null,
    name: null,
    mobile_number: null
  };
  
  export const authReducer = (state = initialAuthState, action) => {
    console.log("Auth Reducer: %j", action)
    switch (action.type) {
      case AUTH_SUCCESS:
        return { ...state, ...action.payload};
      case OTP_VERIFY_SUCCESS:
        return { ...state, token: action.payload.access_token, ref_token: action.payload.refresh_token};
      case LOAD_USER_DETAILS_SUCCESS:
        return {...state, ...action.payload}
        case AUTH_FAILURE:
      case OTP_VERIFY_FAILURE:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
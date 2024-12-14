
export const CREATE_TEMP_USER_REQUEST = 'CREATE_TEMP_USER_REQUEST';
export const CREATE_TEMP_USER_SUCCESS = 'CREATE_TEMP_USER_SUCCESS';
export const CREATE_TEMP_USER_FAILURE = 'CREATE_TEMP_USER_FAILURE';
export const SIGNUP_VERIFY_REQUEST = "SIGNUP_VERIFY_REQUEST"
export const SIGNUP_VERIFY_SUCCESS = 'SIGNUP_VERIFY_SUCCESS';
export const SIGNUP_VERIFY_FAILURE = 'SIGNUP_VERIFY_FAILURE';
export const SIGNUP_RESEND_OTP = "SIGNUP_RESEND_OTP";
export const LOGIN_OTP_REQUEST = 'LOGIN_OTP_REQUEST';
export const LOGIN_OTP_SUCCESS = 'LOGIN_OTP_SUCCESS';
export const LOGIN_OTP_FAILURE = 'LOGIN_OTP_FAILURE';
export const LOGIN_VERIFY_REQUEST = 'LOGIN_VERIFY_REQUEST';
export const LOGIN_VERIFY_SUCCESS = 'LOGIN_VERIFY_SUCCESS';
export const LOGIN_VERIFY_FAILURE = 'LOGIN_VERIFY_FAILURE';
export const GET_USER_DETAILS_REQUEST = 'GET_USER_DETAILS_REQUEST';
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const GET_USER_DETAILS_FAILURE = 'GET_USER_DETAILS_FAILURE';
export const LOAD_USER_DATA_FROM_STORE = 'LOAD_USER_DATA_FROM_STORE';
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const UPDATE_LOGIN_STEP_REQUEST = "UPDATE_LOGIN_STEP_REQUEST";
export const UPDATE_LOGIN_STEP_SUCCESS = "UPDATE_LOGIN_STEP_SUCCESS";
export const UPDATE_LOGIN_STEP_FAILURE = "UPDATE_LOGIN_STEP_FAILURE";
//Temp/user Signup Step 1
export const createTempUserRequest = (credentials) => ({ type: CREATE_TEMP_USER_REQUEST, payload: credentials });
export const createTempUserSuccess = (data) => ({ type: CREATE_TEMP_USER_SUCCESS, payload: data });
export const createTempUserFailure = (error) => ({ type: CREATE_TEMP_USER_FAILURE, payload: error });

//Temp user verify -> Step 2
export const signupVerifyRequest = (credentials) => ({ type: SIGNUP_VERIFY_REQUEST, payload: credentials });
export const signupVerifySuccess = (data) => ({ type: SIGNUP_VERIFY_SUCCESS, payload: data });
export const signupVerifyFailure = (error) => ({ type: SIGNUP_VERIFY_FAILURE, payload: error });
//signup resend otp
export const signupResendOTP = (credentials) => ({ type: SIGNUP_RESEND_OTP, payload: credentials });

//Login send otp step 1
export const loginOtpRequest = (credentials) => ({ type: LOGIN_OTP_REQUEST, payload: credentials });
export const loginOtpSuccess = (data) => ({ type: LOGIN_OTP_SUCCESS, payload: data });
export const loginOtpFailure = (error) => ({ type: LOGIN_OTP_FAILURE, payload: error });

//Login step 2 submit otp
export const loginVerifyRequest = (credentials) => ({ type: LOGIN_VERIFY_REQUEST, payload: credentials });
export const loginVerifySuccess = (data) => ({ type: LOGIN_VERIFY_SUCCESS, payload: data });
export const loginVerifyFailure = (error) => ({ type: LOGIN_VERIFY_FAILURE, payload: error });
// //Resend -> Signup

export const getUserDetailsRequest = (data) => ({ type: GET_USER_DETAILS_REQUEST, payload: data });
export const getUserDetailsSuccess = (data) => ({ type: GET_USER_DETAILS_SUCCESS, payload: data });
export const getUserDetailsFailure = (error) => ({ type: LOGIN_VERIFY_FAILURE, payload: error });

export const refreshTokenRequest = (data) => ({ type: REFRESH_TOKEN_REQUEST, payload: data });
export const refreshTokenSuccess = (data) => ({ type: REFRESH_TOKEN_SUCCESS, payload: data });
export const refreshTokenFailure = (error) => ({ type: REFRESH_TOKEN_FAILURE, payload: error });

export const loadUserDataFromStore = (data) => ({ type: LOAD_USER_DATA_FROM_STORE, payload: data })

export const updateAuthLoginStepRequest = (data) => ({type: UPDATE_LOGIN_STEP_REQUEST, payload: data})
export const updateAuthLoginStepSuccess = (data) => ({ type: UPDATE_LOGIN_STEP_SUCCESS, payload: data });
export const updateAuthLoginStepFailure = (error) => ({ type: UPDATE_LOGIN_STEP_FAILURE, payload: error });

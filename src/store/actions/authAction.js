export const OTP_REQUEST = 'OTP_REQUEST';
export const OTP_SUCCESS = 'OTP_SUCCESS';
export const OTP_FAILURE = 'OTP_FAILURE';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const RESEND_OTP = "RESEND_OTP";
export const OTP_VERIFY_REQUEST = "OTP_VERIFY_REQUEST"
export const OTP_VERIFY_SUCCESS = 'OTP_VERIFY_SUCCESS';
export const OTP_VERIFY_FAILURE = 'OTP_VERIFY_FAILURE';
export const LOAD_USER_DETAILS_REQUEST = 'LOAD_USER_DETAILS_REQUEST';
export const LOAD_USER_DETAILS_SUCCESS = 'LOAD_USER_DETAILS_SUCCESS';

export const otpRequest = (credentials) => ({ type: OTP_REQUEST, payload: credentials });
export const otpSuccess = (data) => ({ type: OTP_SUCCESS, payload: data });
export const otpFailure = (error) => ({ type: OTP_FAILURE, payload: error });

//Temp/user
export const authRequest = (credentials) => ({ type: AUTH_REQUEST, payload: credentials });
export const authSuccess = (data) => ({ type: AUTH_SUCCESS, payload: data });
export const authFailure = (error) => ({ type: AUTH_FAILURE, payload: error });

//Resend -> Signup
export const resendOTP = (credentials) => ({ type: RESEND_OTP, payload: credentials });

//SignUp
export const otpVerifyRequest = (credentials) => ({ type: OTP_VERIFY_REQUEST, payload: credentials });
export const otpVerifySuccess = (data) => ({ type: OTP_VERIFY_SUCCESS, payload: data });
export const otpVerifyFailure = (error) => ({ type: OTP_VERIFY_FAILURE, payload: error });

//load data from store
export const loadUserDetailsRequest = (credentials) => ({ type: LOAD_USER_DETAILS_REQUEST, payload: credentials });
export const loadUserDetailsSuccess = (data) => ({type: LOAD_USER_DETAILS_SUCCESS, payload: data})
export const loadUserDetailsFailure = (error) => ({ type: OTP_VERIFY_FAILURE, payload: error });
export const loadUserDetails = (data) => ({type: LOAD_USER_DETAILS_SUCCESS, payload: data})
export const BASE_URL = "https://autolabs.in/api"
export const DEVICE_URL = "http://192.168.4.1/"

//Authentication FLow
export const TEMP_USER_CREATE = "/temp/users/"
export const SIGNUP_VERIFY_OTP = "/signup/"
export const SEND_OTP = "/verify"
export const LOGIN = "/login"
export const REFRESH_TOKEN = "/refresh/token"
export const UPDATE_LOGIN_STEP = "/user/login/step"

//User
export const GET_USER = "/user"


//Home
export const HOME = "/home/"
export const HOME_DETAILS = "/all/appliances/{HOME_ID}"

//Floor
export const FLOOR = "/floor/"
export const FLOOR_LIST = "/floor/{HOME_ID}"

//Room
export const ROOM = "/room/"
export const ROOM_LIST = "/room/{FLOOR_ID}"


//Add Device
export const DEVICE_TYPE = "config?config_type=device_type"
export const DEVICE = "/devices/"
export const DEVICE_CONFIG_SEND = "/save-config"

export const APPLIANCE_ENDPOINTS = {
    PUBLISH: '/appliance/publish/'
}


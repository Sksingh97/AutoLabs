export const BASE_URL = "http://192.168.3.103:8000/api"

//Authentication FLow
export const TEMP_USER_CREATE = "/temp/users/"
export const SIGNUP_VERIFY_OTP = "/signup/"
export const SEND_OTP = "/verify"
export const LOGIN = "/login"
export const REFRESH_TOKEN = "/refresh/token"

//User
export const GET_USER = "/user"


//Home
export const HOME = "/home/"

//Floor
export const FLOOR = "/floor/"
export const FLOOR_LIST = "/floor/{HOME_ID}"

//Room
export const ROOM = "/room/"
export const ROOM_LIST = "/room/{FLOOR_ID}"


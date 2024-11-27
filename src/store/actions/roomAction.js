export const CREATE_ROOM_REQUEST = 'CREATE_ROOM_REQUEST';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_FAILURE = 'CREATE_ROOM_FAILURE';
export const GET_ROOM_REQUEST = 'GET_ROOM_REQUEST';
export const GET_ROOM_SUCCESS = 'GET_ROOM_SUCCESS';
export const GET_ROOM_FAILURE = 'GET_ROOM_FAILURE';


export const RESET_ROOMS = 'RESET_ROOMS'

export const resetRooms = () => ({type: RESET_ROOMS, payload: {}})

export const getRoomRequest = (data) => ({ type: GET_ROOM_REQUEST, payload: data });
export const getRoomSuccess = (data) => ({ type: GET_ROOM_SUCCESS, payload: data });
export const getRoomFailure = (error) => ({ type: GET_ROOM_FAILURE, payload: error });

export const createRoomRequest = (data) => ({ type: CREATE_ROOM_REQUEST, payload: data });
export const createRoomSuccess = (data) => ({ type: CREATE_ROOM_SUCCESS, payload: data });
export const createRoomFailure = (error) => ({ type: CREATE_ROOM_FAILURE, payload: error });


export const CREATE_FLOOR_REQUEST = 'CREATE_FLOOR_REQUEST';
export const CREATE_FLOOR_SUCCESS = 'CREATE_FLOOR_SUCCESS';
export const CREATE_FLOOR_FAILURE = 'CREATE_FLOOR_FAILURE';
export const GET_FLOOR_REQUEST = 'GET_FLOOR_REQUEST';
export const GET_FLOOR_SUCCESS = 'GET_FLOOR_SUCCESS';
export const GET_FLOOR_FAILURE = 'GET_FLOOR_FAILURE';

export const getFloorRequest = () => ({ type: GET_FLOOR_REQUEST, payload: {} });
export const getFloorSuccess = (data) => ({ type: GET_FLOOR_SUCCESS, payload: data });
export const getFloorFailure = (error) => ({ type: GET_FLOOR_FAILURE, payload: error });

export const createFloorRequest = (data) => ({ type: CREATE_FLOOR_REQUEST, payload: data });
export const createFloorSuccess = (data) => ({ type: CREATE_FLOOR_SUCCESS, payload: data });
export const createFloorFailure = (error) => ({ type: CREATE_FLOOR_FAILURE, payload: error });


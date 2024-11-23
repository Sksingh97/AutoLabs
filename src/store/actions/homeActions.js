export const CREATE_HOME_REQUEST = 'CREATE_HOME_REQUEST';
export const CREATE_HOME_SUCCESS = 'CREATE_HOME_SUCCESS';
export const CREATE_HOME_FAILURE = 'CREATE_HOME_FAILURE';
export const GET_HOME_REQUEST = 'GET_HOME_REQUEST';
export const GET_HOME_SUCCESS = 'GET_HOME_SUCCESS';
export const GET_HOME_FAILURE = 'GET_HOME_FAILURE';

export const getHomeRequest = () => ({ type: GET_HOME_REQUEST, payload: {} });
export const getHomeSuccess = (data) => ({ type: GET_HOME_SUCCESS, payload: data });
export const getHomeFailure = (error) => ({ type: GET_HOME_FAILURE, payload: error });

export const createHomeRequest = (data) => ({ type: CREATE_HOME_REQUEST, payload: data });
export const createHomeSuccess = (data) => ({ type: CREATE_HOME_SUCCESS, payload: data });
export const createHomeFailure = (error) => ({ type: CREATE_HOME_FAILURE, payload: error });


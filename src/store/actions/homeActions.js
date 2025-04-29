export const CREATE_HOME_REQUEST = 'CREATE_HOME_REQUEST';
export const CREATE_HOME_SUCCESS = 'CREATE_HOME_SUCCESS';
export const CREATE_HOME_FAILURE = 'CREATE_HOME_FAILURE';
export const GET_HOME_REQUEST = 'GET_HOME_REQUEST';
export const GET_HOME_SUCCESS = 'GET_HOME_SUCCESS';
export const GET_HOME_FAILURE = 'GET_HOME_FAILURE';
export const GET_HOME_DETAILS_REQUEST = 'GET_HOME_DETAILS_REQUEST'
export const GET_HOME_DETAILS_SUCCESS = 'GET_HOME_DETAILS_SUCCESS'
export const GET_HOME_DETAILS_FAILURE = 'GET_HOME_DETAILS_FAILURE'

export const UPDATE_APPLIANCE_VALUE = 'UPDATE_APPLIANCE_VALUE';

export const getHomeRequest = (data) => ({ type: GET_HOME_REQUEST, payload: data });
export const getHomeSuccess = (data) => ({ type: GET_HOME_SUCCESS, payload: data });
export const getHomeFailure = (error) => ({ type: GET_HOME_FAILURE, payload: error });

export const createHomeRequest = (data) => ({ type: CREATE_HOME_REQUEST, payload: data });
export const createHomeSuccess = (data) => ({ type: CREATE_HOME_SUCCESS, payload: data });
export const createHomeFailure = (error) => ({ type: CREATE_HOME_FAILURE, payload: error });

export const getHomeDetailsRequest = (data) => ({ type: GET_HOME_DETAILS_REQUEST, payload:data })
export const getHomeDetailsSuccess = (data) => ({ type: GET_HOME_DETAILS_SUCCESS, payload: data });
export const getHomeDetailsFail = (error) => ({ type: GET_HOME_DETAILS_FAILURE, payload: error });

export const updateApplianceValue = (applianceId, value) => ({ 
    type: UPDATE_APPLIANCE_VALUE, 
    payload: { applianceId, value } 
});
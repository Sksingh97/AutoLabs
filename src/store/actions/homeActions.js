export const HOME_REQUEST = 'HOME_REQUEST';
export const HOME_SUCCESS = 'HOME_SUCCESS';
export const HOME_FAILURE = 'HOME_FAILURE';

export const homeRequest = () => ({ type: HOME_REQUEST });
export const homeSuccess = (data) => ({ type: HOME_SUCCESS, payload: data });
export const homeFailure = (error) => ({ type: HOME_FAILURE, payload: error });
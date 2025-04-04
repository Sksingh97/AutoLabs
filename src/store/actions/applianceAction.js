export const UPDATE_APPLIANCE_REQUEST = 'UPDATE_APPLIANCE_REQUEST';
export const UPDATE_APPLIANCE_SUCCESS = 'UPDATE_APPLIANCE_SUCCESS';
export const UPDATE_APPLIANCE_FAILURE = 'UPDATE_APPLIANCE_FAILURE';

export const updateApplianceRequest = (data) => ({ type: UPDATE_APPLIANCE_REQUEST, payload: data });
export const updateApplianceSuccess = (data) => ({ type: UPDATE_APPLIANCE_SUCCESS, payload: data });
export const updateApplianceFailure = (error) => ({ type: UPDATE_APPLIANCE_FAILURE, payload: error });

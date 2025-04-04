import { UPDATE_APPLIANCE_SUCCESS, UPDATE_APPLIANCE_FAILURE } from '../actions/applianceAction';

const initialState = {
  error: null
};

export const applianceReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_APPLIANCE_SUCCESS:
      return { ...state, error: null };
    case UPDATE_APPLIANCE_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

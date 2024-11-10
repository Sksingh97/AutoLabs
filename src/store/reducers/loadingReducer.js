import { INCREMENT_LOADING, DECREMENT_LOADING } from "../actions/loadingAction";
// loaderReducer.js
const initialState = {
  loadingCount: 0,
};

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_LOADING:
      return {
        ...state,
        loadingCount: state.loadingCount + 1,
      };
    case DECREMENT_LOADING:
      return {
        ...state,
        loadingCount: Math.max(state.loadingCount - 1, 0),
      };
    default:
      return state;
  }
};


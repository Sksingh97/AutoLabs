import store from './index';  // Import the Redux store

const dispatchService = {
  dispatch: (action) => {
    store.dispatch(action);
  },
};

export default dispatchService;
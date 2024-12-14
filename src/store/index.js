import { configureStore } from '@reduxjs/toolkit';
import {rootReducer} from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import { composeWithDevTools } from '@redux-devtools/extension';
import { DevToolsSettingsManager } from 'react-native';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
const store = configureStore({
  reducer: rootReducer, // Combine reducers
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable thunk since we're using saga
      devTool: true,
    }).concat(sagaMiddleware),
    devTools: composeWithDevTools(),
});

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;
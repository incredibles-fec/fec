import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import qaReducer from './qa';
import rrReducer from './rr';
import pdReducer from './pd';

// This is the setup of a redux store -> may potentially need more stores for different modules
const rootReducer = combineReducers({
  qa: qaReducer,
  rr: rrReducer,
  pd: pdReducer,
});

export function setupStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
    preloadedState,
  });
}

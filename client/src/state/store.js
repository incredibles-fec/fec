import { configureStore } from '@reduxjs/toolkit';
import qaReducer from './qa';

// This is the setup of a redux store -> may potentially need more stores for different modules
export default configureStore({
  reducer: {
    qa: qaReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import qaReducer from './qa';
import rrReducer from './rr';
import pdReducer from './pd';

// This is the setup of a redux store -> may potentially need more stores for different modules
export default configureStore({
  reducer: {
    qa: qaReducer,
    rr: rrReducer,
    pd: pdReducer
  },
});

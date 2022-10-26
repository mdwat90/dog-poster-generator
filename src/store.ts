import {configureStore} from '@reduxjs/toolkit';
import appStateSlice from './reducerSlices/appStateSlice';

export default configureStore({
  reducer: {
    app: appStateSlice,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})
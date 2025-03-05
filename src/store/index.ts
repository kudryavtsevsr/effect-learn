import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { getAPI } from '../services/api/apiFactory';

const api = getAPI();

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(api.middleware as any)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

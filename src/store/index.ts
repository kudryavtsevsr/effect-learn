import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {termsAPI} from '../services/api/termsAPI';

const rootReducer = combineReducers({
  [termsAPI.reducerPath]: termsAPI.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(termsAPI.middleware)
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

/**
 * Redux store configuration
 * Uses Redux Toolkit's configureStore for optimal defaults
 */
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


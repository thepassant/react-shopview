import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import filtersReducer from '../features/filters/filtersSlice';

/**
 * Root reducer combining all feature reducers
 */
const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  filters: filtersReducer,
});

export default rootReducer;


import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { countriesApi } from './api/countriesApi';
import countryReducer from './slices/countrySlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      [countriesApi.reducerPath]: countriesApi.reducer,
      country: countryReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(countriesApi.middleware),
  });

export const wrapper = createWrapper(makeStore);

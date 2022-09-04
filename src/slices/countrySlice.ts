import { random } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const getRandomCountryCode = (countryCodes: string[]) => {
  const randomNumber = random(countryCodes.length - 1);
  return countryCodes[randomNumber];
};

interface CountryState {
  countryCodes: string[];
  countryCode?: string;
}

const initialState: CountryState = {
  countryCodes: [],
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountryCodes: (state, action) => {
      state.countryCodes = action.payload;
    },
    setCountryCode: (state) => {
      const countryCode = getRandomCountryCode(state.countryCodes);
      state.countryCode = countryCode;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.country,
      };
    },
  },
});

export const { setCountryCodes, setCountryCode } = countrySlice.actions;

export const selectCountryCodesState: (state: any) => string[] = (state: any) =>
  state.country.countryCodes;

export const selectCountryCodeState: (state: any) => string | undefined = (
  state: any
) => state.country.countryCode;

export default countrySlice.reducer;

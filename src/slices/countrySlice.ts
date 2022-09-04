import { random } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import IWorldCountryCodes from '../../interfaces/IWorldCountryCodes';
import IWorldContinents from '../../interfaces/IWorldContinents';
import IContinentRange from '../../interfaces/IContinentRange';

const getRandomWorldCountryCode = (countryCodes: string[]) => {
  const randomNumber = random(countryCodes.length - 1);
  return countryCodes[randomNumber];
};

const getRandomCountryCodeFromContinent = (
  countryCodes: string[],
  continentRange: IContinentRange
) => {
  const { fromPosition, toPosition } = continentRange;
  const randomNumber = random(fromPosition as number, toPosition as number);
  return countryCodes[randomNumber];
};

interface ICountryState {
  continents: IWorldContinents;
  countryCodes: string[];
  countryCode?: string;
}

const initialState: ICountryState = {
  continents: {
    africa: {},
    antarctica: {},
    asia: {},
    europe: {},
    northAmerica: {},
    oceania: {},
    southAmerica: {},
  },
  countryCodes: [],
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setWorldCountryCodes: (state, action) => {
      const { continents, countryCodes } = action.payload as IWorldCountryCodes;
      state.continents = continents;
      state.countryCodes = countryCodes;
    },
    setWorldCountryCode: (state) => {
      const countryCode = getRandomWorldCountryCode(state.countryCodes);
      state.countryCode = countryCode;
    },
    setAfricaCountryCode: (state) => {
      state.countryCode = getRandomCountryCodeFromContinent(
        state.countryCodes,
        state.continents.africa
      );
    },
    setAntarcticaCountryCode: (state) => {
      state.countryCode = getRandomCountryCodeFromContinent(
        state.countryCodes,
        state.continents.antarctica
      );
    },
    setAsiaCountryCode: (state) => {
      state.countryCode = getRandomCountryCodeFromContinent(
        state.countryCodes,
        state.continents.asia
      );
    },
    setEuropeCountryCode: (state) => {
      state.countryCode = getRandomCountryCodeFromContinent(
        state.countryCodes,
        state.continents.europe
      );
    },
    setNorthAmericaCountryCode: (state) => {
      state.countryCode = getRandomCountryCodeFromContinent(
        state.countryCodes,
        state.continents.northAmerica
      );
    },
    setOceaniaCountryCode: (state) => {
      state.countryCode = getRandomCountryCodeFromContinent(
        state.countryCodes,
        state.continents.oceania
      );
    },
    setSouthAmericaCountryCode: (state) => {
      state.countryCode = getRandomCountryCodeFromContinent(
        state.countryCodes,
        state.continents.southAmerica
      );
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

export const {
  setWorldCountryCodes,
  setWorldCountryCode,
  setAfricaCountryCode,
  setAntarcticaCountryCode,
  setAsiaCountryCode,
  setEuropeCountryCode,
  setNorthAmericaCountryCode,
  setOceaniaCountryCode,
  setSouthAmericaCountryCode,
} = countrySlice.actions;

export const selectCountryCodeState: (state: any) => string | undefined = (
  state: any
) => state.country.countryCode;

export default countrySlice.reducer;

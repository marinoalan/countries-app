import axios from 'axios';
import type { NextPage } from 'next';
import { camelCase, chain, last } from 'lodash';
import Country from '../src/components/Country';
import { wrapper } from '../src/store';
import {
  setWorldCountryCode,
  setWorldCountryCodes,
} from '../src/slices/countrySlice';
import { useDispatch, useSelector } from 'react-redux';
import IWorldCountryCodes from '../interfaces/IWorldCountryCodes';
import TContinent from '../types/TContinent';
import IWorldContinents from '../interfaces/IWorldContinents';

interface ITransformContinent {
  continentName: string;
  countriesFromPosition: number;
  countriesToPosition: number;
}

interface ITransformWorldCountryCodes {
  continents: ITransformContinent[];
  countryCodes: string[];
}

const addContinentAndCountryCodes: (
  result: ITransformWorldCountryCodes,
  worldCountries: { countryCode: string; continent: string }[],
  continentName: string
) => void = (result, worldCountries, continentName) => {
  const countriesToPosition = worldCountries.length - 1;
  if (result.countryCodes.length === 0) {
    result.continents.push({
      continentName,
      countriesFromPosition: 0,
      countriesToPosition,
    });
  } else {
    const countriesFromPosition =
      (last(result.continents) as ITransformContinent).countriesToPosition + 1;
    result.continents.push({
      continentName,
      countriesFromPosition,
      countriesToPosition: countriesFromPosition + countriesToPosition,
    });
  }
  const countryCodes = worldCountries.map(({ countryCode }) => countryCode);
  result.countryCodes.push(...countryCodes);
};

/**
 * @returns A promise with an array of three-digit country codes defined in ISO 3166-1
 */
const getWorldCountryCodes: () => Promise<IWorldCountryCodes> = async () => {
  try {
    const fields = ['ccn3', 'continents'].join(',');
    const { data } = await axios.get<{ ccn3: string; continents: string[] }[]>(
      'https://restcountries.com/v3.1/all',
      { params: { fields } }
    );
    const countries = data.map(({ ccn3: countryCode, continents }) => {
      const [continent] = continents;
      return { countryCode, continent };
    });
    const worldCountryCodes: ITransformWorldCountryCodes = chain(countries)
      .groupBy('continent')
      .transform(addContinentAndCountryCodes, {
        continents: [],
        countryCodes: [],
      })
      .value();
    const continents = worldCountryCodes.continents.reduce(
      (prev, { continentName, countriesFromPosition, countriesToPosition }) => {
        const name: TContinent = camelCase(continentName) as TContinent;
        const result: {
          [key: string]: {
            fromPosition: number;
            toPosition: number;
          };
        } = {};
        result[name] = {
          fromPosition: countriesFromPosition,
          toPosition: countriesToPosition,
        };
        return Object.assign(prev, result);
      },
      {}
    ) as IWorldContinents;
    return { continents, countryCodes: worldCountryCodes.countryCodes };
  } catch (error) {
    throw new Error('There was an error on API call.');
  }
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const worldCountryCodes = await getWorldCountryCodes();
  store.dispatch(setWorldCountryCodes(worldCountryCodes));
  return {
    props: {
      continents: worldCountryCodes.continents,
      countryCodes: worldCountryCodes.countryCodes,
    },
  };
});

const Home: NextPage = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Country />
      <button
        onClick={() => {
          dispatch(setWorldCountryCode());
        }}
      >
        Get random country
      </button>
    </>
  );
};

export default Home;

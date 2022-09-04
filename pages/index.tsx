import axios from 'axios';
import type { NextPage } from 'next';
import { random } from 'lodash';
import Country from '../src/components/Country';
import { wrapper } from '../src/store';
import {
  selectCountryCodeState,
  setCountryCode,
  setCountryCodes,
} from '../src/slices/countrySlice';
import { useDispatch, useSelector } from 'react-redux';

/**
 * @returns A promise with an array of three-digit country codes defined in ISO 3166-1
 */
const getCountryCodes: () => Promise<string[]> = async () => {
  try {
    const { data } = await axios.get<{ ccn3: string }[]>(
      'https://restcountries.com/v3.1/all',
      { params: { fields: 'ccn3' } }
    );
    return data.map(({ ccn3 }) => ccn3);
  } catch (error) {
    throw new Error('There was an error on API call.');
  }
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const countryCodes = await getCountryCodes();
  store.dispatch(setCountryCodes(countryCodes));
  return {
    props: {
      countryCodes: countryCodes,
    },
  };
});

const getRandomCountryCode = (countryCodes: string[]) => {
  const randomNumber = random(countryCodes.length - 1);
  return countryCodes[randomNumber];
};

const Home: NextPage = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Country />
      <button
        onClick={() => {
          dispatch(setCountryCode());
        }}
      >
        Get random country
      </button>
    </>
  );
};

export default Home;

import axios from 'axios';
import type { NextPage } from 'next';
import { useState } from 'react';
import { random } from 'lodash';
import Country from '../src/components/Country';

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

export async function getStaticProps() {
  const countryCodes = await getCountryCodes();

  return {
    props: {
      countryCodes,
    },
  };
}

const getCountry = async (countryCode: string) => {
  try {
    const { data } = await axios.get<{ ccn3: string }[]>(
      `https://restcountries.com/v3.1/alpha/${countryCode}`,
      { params: { fields: 'capital,flags,languages,continents,capital,name' } }
    );
    return data.map(({ ccn3 }) => ccn3);
  } catch (error) {
    throw new Error('There was an error on API call.');
  }
};

const getRandomCountryCode = (countryCodes: string[]) => {
  const randomNumber = random(countryCodes.length - 1);
  return countryCodes[randomNumber];
};

const Home: NextPage<{ countryCodes: string[] }> = ({ countryCodes }) => {
  const [countryCode, setCountryCode] = useState<string>();

  return (
    <>
      {countryCode && <Country countryCode={countryCode} />}
      <button
        onClick={() => {
          const randomCountryCode = getRandomCountryCode(countryCodes);
          setCountryCode(randomCountryCode);
        }}
      >
        Get random country
      </button>
    </>
  );
};

export default Home;

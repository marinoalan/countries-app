import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ICountry from '../../interfaces/ICountry';

const API = 'https://restcountries.com/v3.1';

const filteredFieldsOnGetCountryByCode = [
  'capital',
  'flags',
  'flag',
  'languages',
  'latlng',
  'continents',
  'capital',
  'name',
];

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getCountryByCode: builder.query<ICountry, string>({
      query: (countryCode: string) => ({
        url: `/alpha/${countryCode}`,
        params: { fields: filteredFieldsOnGetCountryByCode.join(',') },
      }),
    }),
  }),
});

export const { useGetCountryByCodeQuery } = countriesApi;

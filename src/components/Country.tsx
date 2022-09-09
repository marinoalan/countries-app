import { Suspense } from 'react';
import styled from 'styled-components';
import ICountry from '../../interfaces/ICountry';
import { useGetCountryByCodeQuery } from '../api/countriesApi';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { selectCountryCodeState } from '../slices/countrySlice';
import Grid from './Grid';
import CountryInfo from './CountryInfo';

const Map = dynamic(() => import('./Map'), { ssr: false });

const Country = () => {
  const countryCode = useSelector(selectCountryCodeState);
  if (countryCode === undefined) return null;
  return <CountryWithData countryCode={countryCode} />;
};

const MapWrapper = styled.div`
  grid-column: 1 / span 2;
`;

const CountryInfoItem = styled.div`
  border: 2px solid black;
  border-radius: 20px;
  text-align: center;
`;

const CountryWithData = ({ countryCode }: { countryCode: string }) => {
  const { data, isLoading, error, isFetching } =
    useGetCountryByCodeQuery(countryCode);

  if (isLoading) {
    console.log('IS LOADING');
    return <p>Is Loading...</p>;
  }

  if (isFetching) {
    console.log('IS FETCHING', isFetching);
  }
  if (error) return <p>There was an error...</p>;
  const {
    latlng,
    name: { common: countryName },
    flag,
    capital,
    languages,
    flags,
  } = data as ICountry;

  return (
    <>
      <Grid>
        <Suspense fallback={`Loading map...`}>
          <MapWrapper>
            <Map latlng={latlng} countryName={countryName} flag={flag} />
          </MapWrapper>
        </Suspense>
        <CountryInfoItem>
          <CountryInfo
            capital={capital}
            country={countryName}
            languages={Object.values(languages)}
            srcFlag={flags.png}
          />
        </CountryInfoItem>
      </Grid>
    </>
  );
};

export default Country;

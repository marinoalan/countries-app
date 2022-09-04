import Image from 'next/image';
import { FC, Suspense } from 'react';
import styled from 'styled-components';
import ICountry from '../../interfaces/ICountry';
import { useGetCountryByCodeQuery } from '../api/countriesApi';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { selectCountryCodeState } from '../slices/countrySlice';

const ImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const Map = dynamic(() => import('./Map'), { ssr: false });

const Country = () => {
  const countryCode = useSelector(selectCountryCodeState);
  if (countryCode === undefined) return null;
  return <CountryWithData countryCode={countryCode} />;
};

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
  const response = data as ICountry;
  return (
    <>
      <Suspense fallback={`Loading...`}>
        <Map
          latlng={response.latlng}
          countryName={response.name.common}
          flag={response.flag}
        />
      </Suspense>

      <ImageContainer>
        <Image
          layout='fill'
          objectFit='contain'
          alt='Flag image'
          src={response.flags.png}
        />
      </ImageContainer>
      <div>
        <h1>Country:</h1>
        <p>{response.name.common}</p>
      </div>
      <div>
        <h1>
          {response.capital.length > 1 ? 'Capital cities' : 'Capital city'}:
        </h1>
        <p>{response.capital.join(' - ')}</p>
      </div>

      <div>
        <h1>
          {Object.values(response.languages).length > 1
            ? 'Languages'
            : 'Language'}
          :
        </h1>
        <p>{Object.values(response.languages).join(' - ')}</p>
      </div>
    </>
  );
};

export default Country;

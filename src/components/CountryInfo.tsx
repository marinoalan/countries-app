import { FC, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { isEmpty } from 'lodash';

const ImageContainer = styled.div`
  position: relative;
`;

const CountryImage = ({ src }: { src: string }) => {
  const [imageSize, setImageSize] = useState<{
    imageWidth?: number;
    imageHeight?: number;
  }>({});
  return (
    <ImageContainer>
      <Image
        {...(isEmpty(imageSize)
          ? { layout: 'fill', objectFit: 'contain' }
          : { width: imageSize.imageWidth, height: imageSize.imageHeight })}
        alt='Flag image'
        onLoadingComplete={({ naturalWidth, naturalHeight }) => {
          setImageSize({
            imageWidth: naturalWidth,
            imageHeight: naturalHeight,
          });
        }}
        src={src}
      />
    </ImageContainer>
  );
};

const CountryInfo: FC<{
  country: string;
  capital: string[];
  languages: string[];
  srcFlag: string;
}> = ({ country, capital, languages, srcFlag }) => (
  <>
    <div>
      <h2>{country}</h2>
      <CountryImage src={srcFlag} />
    </div>
    {!isEmpty(capital) && (
      <div>
        <h4>{capital.length > 1 ? 'Capital cities' : 'Capital city'}:</h4>
        <p>{capital.join(' - ')}</p>
      </div>
    )}

    {!isEmpty(Object.values(languages)) && (
      <div>
        <h4>
          {Object.values(languages).length > 1 ? 'Languages' : 'Language'}:
        </h4>
        <p>{Object.values(languages).join(' - ')}</p>
      </div>
    )}
  </>
);

export default CountryInfo;

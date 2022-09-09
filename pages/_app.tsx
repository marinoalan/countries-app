import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { wrapper } from '../src/store';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);

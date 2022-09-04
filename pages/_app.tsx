import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '../src/store';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);

import '../styles/globals.css';
import type { AppProps } from 'next/app';

import client, { ApolloProvider } from '../apollo';
import Footer from '../containers/Footer';
import Header from '../containers/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  );
}
export default MyApp;

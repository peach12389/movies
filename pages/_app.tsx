import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import type { AppProps } from 'next/app';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import client, { ApolloProvider } from '../apollo';
import '../public/nprogress.css';
import '../styles/globals.css';
import 'intersection-observer';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  );
}

export default MyApp;

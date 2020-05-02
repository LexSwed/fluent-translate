import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import '@fxtrot/edge/dist/styles.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <title>Edge Translate</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;

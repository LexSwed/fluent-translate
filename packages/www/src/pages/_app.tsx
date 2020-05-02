import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Edge } from '@fxtrot/edge';

import '@fxtrot/edge/dist/styles.css';
import './global.css';

import Header from '../components/header';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <title>Edge Translate</title>
      </Head>
      <Edge>
        <Header />
        <Component {...pageProps} />
      </Edge>
    </>
  );
};

export default App;

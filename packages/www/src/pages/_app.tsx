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
        <link rel="shortcut icon" href="/images/icon.svg" />
        <title>Edge Translate</title>
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:title"
          content="Edge Translate for Edge and Chrome"
        />
        <meta
          property="og:description"
          content="Translate any text with few clicks, learn languages involuntary"
        />
        <meta
          property="og:image"
          content="https://edge-translate.now.sh/images/screenshot-3.png"
        />
      </Head>
      <Edge>
        <Header />
        <Component {...pageProps} />
      </Edge>
    </>
  );
};

export default App;

import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@fxtrot/edge';

import './global.css';

import Header from '../components/header';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/images/icon.svg" />
        <title>Edge Translate</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
          content="https://edge-translate.now.sh/images/twitter-image.png"
        />
      </Head>
      <ThemeProvider>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;

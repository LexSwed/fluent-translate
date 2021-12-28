import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { stitchesConfig, ThemeProvider } from '@fxtrot/ui';

import Header from '../components/Header';

const globals = stitchesConfig.globalCss({
  html: {
    overscrollBehavior: 'none',
  },
  body: {
    m: 0,
    background:
      'radial-gradient(farthest-corner at 30% 30%,$warmGray100 20%, $blueGray100 80%)',
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  globals();
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
      <ThemeProvider theme="lightBlue">
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;

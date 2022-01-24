import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Box, stitchesConfig } from '@fxtrot/ui';
import Header from '../components/Header';
import { AppContext } from '@edge-translate/extension/src/popup/AppContext';

const globals = stitchesConfig.globalCss({
  'html': {
    'overscrollBehavior': 'none',
    '@tablet': {
      fontSize: 14,
    },
  },
  'body': {
    m: 0,
  },
  '#__next': {
    height: '-webkit-fill-available',
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
        <meta property="og:image" content="/images/twitter-image.png" />
      </Head>
      <AppContext>
        <Box minHeight="100vh" bc="$surfaceStill">
          <Header />
          <Component {...pageProps} />
        </Box>
      </AppContext>
    </>
  );
};

export default App;

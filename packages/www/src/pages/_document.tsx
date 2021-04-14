import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { stitchesConfig } from '@fxtrot/ui';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: stitchesConfig.getCssString() }}
          />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

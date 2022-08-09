import React from 'react';
import { Box, CssStyles, Column } from '@fxtrot/ui';

import { Input } from './Input';
import { Results } from './Results';
import { ErrorScreen } from './ErrorScreen';

import { browser, Sentry } from './utils';
import { useError } from './atoms';

const mainStyle: CssStyles = {
  overflow: 'hidden',
  bc: '$background',
};

const App = () => {
  const [error, setError] = useError();
  if (error) {
    return (
      <Box css={mainStyle}>
        <ErrorScreen />
      </Box>
    );
  }
  return (
    <ErrorBoundary setError={setError}>
      <Column
        main="stretch"
        cross="stretch"
        css={mainStyle}
        lang={browser.lang}
      >
        <Input />
        <Results />
      </Column>
    </ErrorBoundary>
  );
};

export default App;

class ErrorBoundary extends React.Component<{
  setError: (error: string) => void;
  children: React.ReactNode;
}> {
  componentDidCatch(error: Error) {
    console.error(error);
    Sentry.captureException(error);
    this.props.setError(`${error}`);
  }

  render() {
    return this.props.children;
  }
}

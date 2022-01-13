import React from 'react';
import { Flex, Box, CssStyles } from '@fxtrot/ui';

import { Input } from './Input';
import { Results } from './Results';
import { ErrorScreen } from './ErrorScreen';

import { Sentry } from './utils';
import { useError } from './atoms';

const mainStyle: CssStyles = {
  overflow: 'hidden',
  bc: '$surfaceStill',
  minWidth: '380px',
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
      <Flex flow="column" main="stretch" cross="stretch" css={mainStyle}>
        <Input />
        <Results />
      </Flex>
    </ErrorBoundary>
  );
};

export default App;

class ErrorBoundary extends React.Component<{
  setError: (error: string) => void;
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

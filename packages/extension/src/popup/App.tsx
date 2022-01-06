import React, { useMemo } from 'react';
import { Flex, Box, Icon, Text, CssStyles } from '@fxtrot/ui';
import { FireIcon } from '@heroicons/react/outline';

import { Input } from './Input';
import { Translated } from './Results';
import { Footer } from './Footer';

import { Sentry } from '../utils';
import { useError } from './atoms';

class App extends React.Component<{ error?: string | null }> {
  state = {
    hasError: false,
  };

  componentDidUpdate() {
    if (this.props.error && !this.state.hasError) {
      this.setState({ hasError: true });
    }
  }

  componentDidCatch(error: Error) {
    console.error(error);
    Sentry.captureException(error);

    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box css={mainStyle}>
          <Flex flow="column" cross="center" main="center" gap="md">
            <Icon as={FireIcon} size="3xl" color="$gray400" />
            {this.props.error ? (
              <Text align="center" size="sm">
                {this.props.error}
              </Text>
            ) : (
              <>
                <Text align="center" size="sm">
                  Something broke the service, checking what was it...
                </Text>
                <Text align="center" tone="light" size="xs">
                  In the meanwhile, try to close and open this popup,
                  <br />
                  maybe the{' '}
                  <span role="img" aria-label="bug">
                    🐞
                  </span>{' '}
                  is already gone
                </Text>
              </>
            )}
          </Flex>
        </Box>
      );
    }
    return (
      <>
        <Flex flow="column" main="stretch" cross="stretch" css={mainStyle}>
          <Input />
          <Translated />
        </Flex>
        <Footer />
      </>
    );
  }
}

const mainStyle: CssStyles = {
  pb: '$12',
  overflow: 'hidden',
  bc: '$surfaceStill',
  minWidth: '360px',
};

const AppWithError: React.FC = (children) => {
  const [error] = useError();
  return useMemo(() => <App error={error}>{children}</App>, [error, children]);
};

export default AppWithError;

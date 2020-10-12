import React, { useMemo } from 'react';
import { Flex, Box, Icon, Text, StyleRecord } from '@fxtrot/ui';
import { HiOutlineFire } from 'react-icons/hi';

import TextInput from './TextInput';
import Results from './Results';
import Footer from './Footer';

import { Sentry } from '../utils';
import { useError } from './store/utils';
// TODO: remove it when stitches global css works!
import './global.css';

const styles: StyleRecord = {
  app: {
    p: '$3',
    pb: '$12',
    overflow: 'hidden',
    bc: '$surfaceStill',
    minWidth: '360px',
  },
};

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
    Sentry.captureException(error);

    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box css={styles.app}>
          <Flex cross="center" main="center" space="md">
            <Icon as={HiOutlineFire} size="3xl" color="$gray400" />
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
        <Flex main="stretch" cross="stretch" space="md" css={styles.app}>
          <TextInput />
          <Results />
        </Flex>
        <Footer />
      </>
    );
  }
}

const AppWithError: React.FC = (children) => {
  const error = useError();

  return useMemo(() => <App error={error}>{children}</App>, [error, children]);
};

export default AppWithError;

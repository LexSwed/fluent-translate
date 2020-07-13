import React, { useMemo } from 'react';
import { Stack, Box, Icon, Text } from '@fxtrot/edge';

import '../global.css';
import styles from './styles.css';

import TextInput from './TextInput';
import Results from './Results';
import Footer from './Footer';

import { Sentry } from '../utils';
import { useError } from './store/utils';

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
        <Box className={styles.app} p="m">
          <Stack align="center">
            <Icon icon="cloud_off" size="xl" color="var(--gray-400)" />
            {this.props.error ? (
              <Text align="center">{this.props.error}</Text>
            ) : (
              <>
                <Text align="center">
                  Something broke the service,
                  <br /> checking what was it...
                </Text>
                <Box pt="m" />
                <Text align="center" tone="light">
                  In the meanwhile, try to close and open this popup,
                  <br />
                  maybe the{' '}
                  <span role="img" aria-label="bug">
                    🐞
                  </span>
                  is already gone
                </Text>
              </>
            )}
          </Stack>
        </Box>
      );
    }
    return (
      <>
        <Box className={styles.app} p="m">
          <Stack space="m">
            <TextInput />
            <Results />
          </Stack>
        </Box>
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

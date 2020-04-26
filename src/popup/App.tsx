import React from 'react';
import { Stack, Box, Icon, Text } from '@fxtrot/edge';
import { BrowserClient } from '@sentry/browser';

import './styles.css';

import TextInput from './TextInput';
import Translated from './Translated';
import Footer from './Footer';

const Sentry = new BrowserClient({
  dsn:
    'https://dffd96a87e8f47e8a2921033d3d53e05@o383828.ingest.sentry.io/5214268'
});

class App extends React.Component {
  state = {
    hasError: false
  };

  componentDidCatch(error: Error) {
    Sentry.captureException(error);

    this.setState({ hasError: true });
  }

  style = { width: '300px' };

  render() {
    if (this.state.hasError) {
      return (
        <Box p="m" style={this.style}>
          <Stack align="center">
            <Icon icon="cloud_off" size="xl" color="var(--gray-400)" />
            <Text align="center">
              Something broke the service,
              <br /> we are notified about it!
            </Text>
            <Box pt="m" />
            <Text align="center" tone="light">
              In the meanwhile, try to close and open this popup, maybe the{' '}
              <span role="img" aria-label="bug">
                🐞
              </span>
              is gone...
            </Text>
          </Stack>
        </Box>
      );
    }
    return (
      <Box p="m" style={this.style}>
        <Stack space="m">
          <TextInput />
          <Translated />
          <Footer />
        </Stack>
      </Box>
    );
  }
}

export default App;

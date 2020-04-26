import React from 'react';
import { Stack, Box } from '@fxtrot/edge';

import './styles.css';

import TextInput from './TextInput';
import Translated from './Translated';
import Footer from './Footer';

const App: React.FC = () => {
  return (
    <Box p="m">
      <Stack space="m" style={{ width: '300px' }}>
        <TextInput />
        <Translated />
        <Footer />
      </Stack>
    </Box>
  );
};

export default App;

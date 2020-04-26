import React from 'react';
import { Stack, Box } from '@fxtrot/edge';

import Footer from './Footer/Footer';
import TextInput from './TextInput';
import Translated from './Translated';

import './styles.css';

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

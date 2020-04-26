import React from 'react';
import { Stack } from '@fxtrot/edge';

import Footer from './Footer/Footer';
import TextInput from './TextInput';
import Translated from './Translated';

const App: React.FC = () => {
  return (
    <Stack space="m" style={{ width: '300px' }}>
      <TextInput />
      <Translated />
      <Footer />
    </Stack>
  );
};

export default App;

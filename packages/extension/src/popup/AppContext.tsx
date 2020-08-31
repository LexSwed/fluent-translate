import React from 'react';
import { Edge } from '@fxtrot/edge';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import { useStore } from './store';
import { StoreContextProvider } from './store/utils';

const AppContextProvider: React.FC = ({ children }) => {
  const store = useStore();

  return (
    <Edge>
      <ThemeProvider>
        <CSSReset />
        <StoreContextProvider value={store}>{children}</StoreContextProvider>
      </ThemeProvider>
    </Edge>
  );
};

export default AppContextProvider;

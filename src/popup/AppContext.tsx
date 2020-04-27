import React from 'react';
import { Edge } from '@fxtrot/edge';
import '@fxtrot/edge/dist/styles.css';

import { useStore } from './store';
import { StoreContextProvider } from './store/utils';

const AppContextProvider: React.FC = ({ children }) => {
  const store = useStore();

  return (
    <Edge>
      <StoreContextProvider value={store}>{children}</StoreContextProvider>
    </Edge>
  );
};

export default AppContextProvider;

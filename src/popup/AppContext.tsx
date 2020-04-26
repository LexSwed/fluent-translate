import React from 'react';

import { useStore } from './store';
import { StoreContextProvider } from './store/utils';

const AppContextProvider: React.FC = ({ children }) => {
  const store = useStore();

  return <StoreContextProvider value={store}>{children}</StoreContextProvider>;
};

export default AppContextProvider;

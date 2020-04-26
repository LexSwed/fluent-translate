import React from 'react';
import ReactDOM from 'react-dom';
import { Edge } from '@fxtrot/edge';
import '@fxtrot/edge/dist/styles.css';

import AppContextProvider from './AppContext';
import App from './App';

ReactDOM.render(
  <Edge>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </Edge>,
  document.getElementById('root')
);

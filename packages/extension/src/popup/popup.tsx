import React from 'react';
import { createRoot } from 'react-dom/client';

import { AppContext } from './AppContext';
import App from './App';

const container = document.getElementById('fluent-translate');
const root = createRoot(container!);
root.render(
  <AppContext>
    <App />
  </AppContext>
);

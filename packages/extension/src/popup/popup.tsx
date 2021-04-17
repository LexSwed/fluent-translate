import React from 'react';
import ReactDOM from 'react-dom';

import AppContext from './AppContext';
import App from './App';

const element = document.getElementById('edge-translate');
element?.attachShadow({ mode: 'open' });

ReactDOM.render(
  <AppContext>
    <App />
  </AppContext>,
  (element as HTMLElement).shadowRoot as ShadowRoot
);

import React from 'react';
import ReactDOM from 'react-dom';

import AppContext from './AppContext';
import App from './App';

ReactDOM.render(
  <AppContext>
    <App />
  </AppContext>,
  document.getElementById('root')
);

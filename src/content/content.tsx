import ReactDOM from 'react-dom';
import React from 'react';

import AppContext from '../popup/AppContext';
import App from './App';

chrome.runtime.onMessage.addListener(({ text }) => {
  const el = document.createElement('div');

  document.body.appendChild(el);

  ReactDOM.render(
    <AppContext>
      <App
        text={text}
        onClose={() => {
          ReactDOM.unmountComponentAtNode(el);
          document.body.removeChild(el);
        }}
      />
    </AppContext>,
    el
  );
});

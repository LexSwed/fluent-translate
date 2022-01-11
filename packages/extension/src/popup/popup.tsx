import ReactDOM from 'react-dom';

import { AppContext } from './AppContext';
import App from './App';
import { userLang } from './utils';

// const element = document.getElementById('edge-translate') as HTMLElement & {
//   shadowRoot: ShadowRoot;
// };
// element.attachShadow({ mode: 'open' });

// const style = document.createElement('style');
// style.innerHTML = stitchesConfig.getCssText();
// element.shadowRoot.appendChild(style);

ReactDOM.render(
  <AppContext>
    <App />
  </AppContext>,
  document.getElementById('edge-translate')
);

document.documentElement.setAttribute('lang', userLang);

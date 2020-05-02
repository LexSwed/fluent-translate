import '@webcomponents/webcomponentsjs';
import EdgeTranslate from './EdgeTranslateWC';

// @ts-ignore
customElements.define('edge-translate', EdgeTranslate);

const el = document.createElement('edge-translate');
el.setAttribute(
  'style',
  'position: fixed; top: 8px; right: 8px; z-index: 999999;'
);
document.documentElement.appendChild(el);

chrome.runtime.onMessage.addListener(({ text }) => {
  el.setAttribute('text', text);
});

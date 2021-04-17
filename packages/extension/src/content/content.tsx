import '@webcomponents/webcomponentsjs';
import EdgeTranslate from './EdgeTranslateWC';

let element: HTMLElement;

chrome.runtime.onMessage.addListener(({ text }) => {
  if (!element) {
    customElements.define('edge-translate', EdgeTranslate);
    element = document.createElement('edge-translate');
    element.setAttribute(
      'style',
      'position: fixed; top: 8px; right: 8px; z-index: 999999;'
    );
    element.setAttribute('id', 'edge-translate');
    document.documentElement.appendChild(element);
  }

  element.setAttribute('text', text);
});

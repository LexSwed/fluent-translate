import '@webcomponents/webcomponentsjs';
import FluentTranslate from './FluentTranslateWC';

let element: HTMLElement;

chrome.runtime.onMessage.addListener(({ text }) => {
  if (!element) {
    customElements.define('fluent-translate', FluentTranslate);
    element = document.createElement('fluent-translate');
    element.setAttribute(
      'style',
      'position: fixed; top: 8px; right: 8px; z-index: 999999;'
    );
    element.setAttribute('id', 'fluent-translate');
    document.documentElement.appendChild(element);
  }

  element.setAttribute('text', text);
});
